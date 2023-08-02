import { MusicActionEvent } from './event';
import { UserInterface } from './user-interface';
import { MasteryComponent } from './mastery/mastery';
import { MusicManager } from './manager';
import { HiredBard, Instrument, MusicSkillData } from './music.types';
import { Decoder } from './decoder/decoder';
import { HiredBards } from './hired-bards';
import { Upgrades } from './equipment/upgrades';

import './music.scss';

export class Music extends GatheringSkill<Instrument, MusicSkillData> {
    public readonly version = 4;
    public readonly _media = 'assets/instruments/guitar.png';
    public readonly renderQueue = new MusicRenderQueue();

    public activeInstrument: Instrument;
    public bards = new HiredBards(this);
    public userInterface: UserInterface;
    public modifiers = new MappedModifiers();
    public masteriesUnlocked = new Map<Instrument, boolean[]>();

    private renderedProgressBar?: ProgressBar;
    private sheetMusicChance = 2;

    public readonly manager = new MusicManager(this, this.game);
    public upgrades: Upgrades;

    constructor(namespace: DataNamespace, public readonly game: Game) {
        super(namespace, 'Music', game);
    }

    public registerData(namespace: DataNamespace, data: MusicSkillData) {
        super.registerData(namespace, data);

        for (const instrument of data.instruments) {
            this.actions.registerObject(new Instrument(namespace, instrument));
        }
    }

    public get name() {
        return getLangString('Myth_Music_Music');
    }

    public get actionLevel() {
        return this.activeInstrument.level;
    }

    public get masteryAction() {
        return this.activeInstrument;
    }

    public get masteryModifiedInterval() {
        return this.actionInterval;
    }

    public get actionInterval() {
        return this.getInstrumentInterval(this.activeInstrument);
    }

    public train(instrument: Instrument) {
        const wasActive = this.isActive;

        if (this.isActive && !this.stop()) {
            return;
        }

        if (!wasActive || instrument !== this.activeInstrument) {
            this.activeInstrument = instrument;
            this.start();
        }
    }

    public hire(instrument: Instrument) {
        if (this.bards.isHired(instrument)) {
            return;
        }

        const hireModifier = this.manager.getHireCostModifier(instrument);
        const hireCost = Math.floor(this.manager.calculateHireCost(instrument) * (1 + hireModifier / 100));

        const canAfford = this.game.gp.canAfford(hireCost);

        if (!canAfford) {
            let html = `
            <h5 class="font-w400 text-combat-smoke font-size-sm mb-2">
                You cannot afford to hire this bard:
                <img class="instrument-icon align-middle" src="${instrument.media}" />
                ${instrument.name}
            </h5>

            <h5 class="text-danger">
                <img class="skill-icon-xs mr-2" src="${this.game.gp.media}" /> ${numberWithCommas(hireCost)} GP
            </h5>`;

            for (const modifier of this.manager.getModifiers(instrument)) {
                html += `<small class="${modifier.isActive ? 'text-success' : 'myth-text-grey'}">`;

                if (!modifier.isActive) {
                    html += `
                    <span>
                        (<img class="skill-icon-xxs mr-1"
                               src="${cdnMedia('assets/media/main/mastery_header.svg')}" />
                               ${modifier.level})
                    </span>`;
                }

                if (modifier.isUpgrade) {
                    html += `<img class="skill-icon-xxs mr-1" src="${this.manager.essenceOfMusicIcon}" />`;
                }

                html += `<span>${modifier.description}</span></small><br />`;
            }

            SwalLocale.fire({
                html,
                showCancelButton: false,
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        } else {
            let html = `<h5 class="font-w400 text-combat-smoke font-size-sm mb-2">
            ${getLangString('Myth_Music_Would_You_Like_To_Hire_This_Bard')}
            <img class="instrument-icon align-middle" src="${instrument.media}" />
            ${instrument.name}
            </h5>

            <h5>
                <img class="skill-icon-xs mr-2" src="${this.game.gp.media}" /> ${numberWithCommas(hireCost)} GP
            </h5>`;

            for (const modifier of this.manager.getModifiers(instrument)) {
                html += `<small class="${modifier.isActive ? 'text-success' : 'myth-text-grey'}">`;

                if (!modifier.isActive && !modifier.isUpgrade) {
                    html += `
                    <span>
                        (<img class="skill-icon-xxs mr-1"
                        src="${cdnMedia('assets/media/main/mastery_header.svg')}" />
                        ${modifier.level})
                    </span>`;
                }

                if (modifier.isUpgrade) {
                    html += `<img class="skill-icon-xxs mr-1" src="${this.manager.essenceOfMusicIcon}" />`;
                }

                html += `<span>${modifier.description}</span></small><br />`;
            }

            html += `<h5 class="font-w600 text-danger font-size-sm mt-3 mb-1">${getLangString(
                'Myth_Music_This_Will_Replace_The_Hired_Bard'
            )}</h5>`;

            const bard1 = this.bards.get(1);
            const bard2 = this.bards.get(2);

            SwalLocale.fire({
                html,
                showCancelButton: true,
                showDenyButton: this.manager.isBandPracticeUnlocked,
                icon: 'info',
                confirmButtonText: bard1
                    ? templateLangString('Myth_Music_Replace', { name: bard1.instrument.name })
                    : getLangString('Myth_Music_Hire'),
                denyButtonText: bard2
                    ? templateLangString('Myth_Music_Replace', { name: bard2.instrument.name })
                    : getLangString('Myth_Music_Hire')
            }).then(result => {
                if (result.isDismissed) {
                    return;
                }

                this.game.gp.remove(hireCost);

                if (result.isConfirmed) {
                    if (bard1) {
                        this.bards.remove(bard1.instrument);
                    }

                    const hiredBard: HiredBard = {
                        instrument,
                        slot: 1,
                        isUpgraded: false,
                        socket: undefined,
                        utility: undefined
                    };

                    this.bards.set(instrument, hiredBard);

                    this.userInterface.bard1.setBard(hiredBard);
                }

                if (result.isDenied) {
                    if (bard2) {
                        this.bards.remove(bard2?.instrument);
                    }

                    const hiredBard: HiredBard = {
                        instrument,
                        slot: 2,
                        isUpgraded: false,
                        socket: undefined,
                        utility: undefined
                    };

                    this.bards.set(instrument, hiredBard);

                    this.userInterface.bard2.setBard(hiredBard);
                }

                this.computeProvidedStats(true);

                this.userInterface.instruments.forEach(component => {
                    component.updateDisabled();
                });
            });
        }
    }

    public unlockMastery(instrument: Instrument) {
        SwalLocale.fire({
            html: '<div id="myth-music-mastery-container"></div>',
            showConfirmButton: false,
            showCancelButton: false,
            showDenyButton: false,
            didOpen: popup => {
                ui.create(
                    MasteryComponent(this.game, this, instrument),
                    popup.querySelector('#myth-music-mastery-container')
                );
            }
        });
    }

    public getInstrumentInterval(instrument: Instrument) {
        return this.modifyInterval(instrument.baseInterval, instrument);
    }

    public getFlatIntervalModifier(instrument: Instrument) {
        let modifier = super.getFlatIntervalModifier(instrument);

        if (this.isPoolTierActive(2)) {
            modifier -= 250;
        }

        return modifier;
    }

    public onLoad() {
        super.onLoad();

        for (const instrument of this.actions.registeredObjects.values()) {
            this.renderQueue.actionMastery.add(instrument);
        }

        this.computeProvidedStats(false);

        this.renderQueue.grants = true;
        this.renderQueue.bardModifiers = true;
        this.renderQueue.visibleInstruments = true;

        if (this.isActive) {
            this.renderQueue.progressBar = true;
        }

        for (const component of this.userInterface.instruments.values()) {
            component.updateDisabled();
        }
    }

    public onLevelUp(oldLevel: number, newLevel: number) {
        super.onLevelUp(oldLevel, newLevel);

        this.renderQueue.visibleInstruments = true;
    }

    public onMasteryLevelUp(action: Instrument, oldLevel: number, newLevel: number): void {
        super.onMasteryLevelUp(action, oldLevel, newLevel);

        if (newLevel >= action.level) {
            this.computeProvidedStats(true);
        }

        this.renderQueue.gpRange = true;
        this.renderQueue.bardModifiers = true;
    }

    public onModifierChange() {
        super.onModifierChange();

        this.renderQueue.grants = true;
        this.renderQueue.gpRange = true;
        this.renderQueue.bardModifiers = true;
    }

    public render() {
        super.render();

        this.renderProgressBar();
        this.renderGrants();
        this.renderGPRange();
        this.renderBardModifiers();
        this.renderVisibleInstruments();
    }

    public postDataRegistration() {
        super.postDataRegistration();

        this.sortedMasteryActions = this.actions.allObjects.sort((a, b) => a.level - b.level);
        this.milestones.push(...this.actions.allObjects);

        this.sortMilestones();
        this.upgrades = new Upgrades(this, this.game);

        for (const action of this.actions.allObjects) {
            this.masteriesUnlocked.set(action, [true, false, false, false]);
        }

        const capesToExclude = ['melvorF:Max_Skillcape'];

        if (cloudManager.hasTotHEntitlement) {
            capesToExclude.push('melvorTotH:Superior_Max_Skillcape');
        }

        const skillCapes = this.game.shop.purchases.filter(purchase => capesToExclude.includes(purchase.id));

        for (const cape of skillCapes) {
            const allSkillLevelsRequirement = cape.purchaseRequirements.find(
                req => req.type === 'AllSkillLevels'
            ) as AllSkillLevelRequirement;

            if (allSkillLevelsRequirement?.exceptions === undefined) {
                allSkillLevelsRequirement.exceptions = new Set();
            }

            allSkillLevelsRequirement?.exceptions.add(this);
        }
    }

    public preAction() {}

    public postAction() {
        this.renderQueue.grants = true;
    }

    public onEquipmentChange() {}

    public computeProvidedStats(updatePlayer = true) {
        this.modifiers.reset();

        for (const bard of this.bards.all()) {
            const modifiers = this.manager.getModifiersForApplication(bard.instrument);
            this.modifiers.addArrayModifiers(modifiers);

            if (bard.socket) {
                const upgrade = this.upgrades.modifiers.find(
                    modifier => `mythMusic:${modifier.itemId}` === bard.socket.id
                );

                if (upgrade) {
                    this.modifiers.addArrayModifiers(upgrade.modifiers);
                }
            }

            if (bard.utility) {
                const upgrade = this.upgrades.modifiers.find(
                    modifier => `mythMusic:${modifier.itemId}` === bard.utility.id
                );

                if (upgrade) {
                    this.modifiers.addArrayModifiers(upgrade.modifiers);
                }
            }
        }

        if (updatePlayer) {
            this.game.combat.player.computeAllStats();
        }
    }

    public get actionRewards() {
        const rewards = new Rewards(this.game);
        const actionEvent = new MusicActionEvent(this, this.activeInstrument);

        rewards.addXP(this, this.activeInstrument.baseExperience);
        rewards.addGP(this.manager.getGoldToAward(this.activeInstrument));

        const concertPass = this.game.items.getObjectByID('mythMusic:Concert_Pass') as EquipmentItem;

        if (
            concertPass &&
            this.game.combat.player.equipment.checkForItem(concertPass) &&
            this.game.itemCharges.getCharges(concertPass)
        ) {
            for (const skillId of this.activeInstrument.skills) {
                const skill = this.game.skills.getObjectByID(skillId);

                if (skill?.isUnlocked) {
                    const level = Math.min(skill.level, 120);
                    const expRequired = exp.level_to_xp(level + 1) - exp.level_to_xp(level);
                    const xp = Math.max(expRequired / 1000, 1);

                    rewards.addXP(skill, xp);
                }
            }
        }

        let sheetMusicChance = this.sheetMusicChance;

        for (const bard of this.bards.all()) {
            if (bard?.socket?.id === 'mythMusic:Diamond_String') {
                sheetMusicChance +=
                    this.game.modifiers.increasedSheetMusicDropRate - this.game.modifiers.decreasedSheetMusicDropRate;
            }
        }

        if (rollPercentage(sheetMusicChance)) {
            rewards.addItemByID('mythMusic:Sheet_Music', 1);
        }

        this.addCommonRewards(rewards);

        for (const bard of this.bards.all()) {
            if (bard?.socket?.id === 'mythMusic:Mystic_Oil') {
                this.rollForRareDrops(this.actionLevel, rewards);
                this.addMasteryToken(rewards);
                this.rollForPets(this.currentActionInterval);
                this.game.summoning.rollMarksForSkill(this, this.masteryModifiedInterval);
            }
        }

        this.game.processEvent(actionEvent, this.currentActionInterval);

        return rewards;
    }

    public getXPModifier(instrument?: Instrument) {
        let modifier = super.getXPModifier(instrument);

        if (this.isPoolTierActive(0)) {
            modifier += 3;
        }

        return modifier;
    }

    public getMasteryXPModifier(instrument: Instrument) {
        let modifier = super.getMasteryXPModifier(instrument);

        if (this.isPoolTierActive(1)) {
            modifier += 5;
        }

        return modifier;
    }

    public renderGrants() {
        if (!this.renderQueue.grants) {
            return;
        }

        for (const component of this.userInterface.instruments.values()) {
            const masteryXP = this.getMasteryXPToAddForAction(
                component.instrument,
                this.getInstrumentInterval(component.instrument)
            );

            const baseMasteryXP = this.getBaseMasteryXPToAddForAction(
                component.instrument,
                this.getInstrumentInterval(component.instrument)
            );

            const poolXP = this.getMasteryXPToAddToPool(masteryXP);

            component.updateGrants(
                this.modifyXP(component.instrument.baseExperience, component.instrument),
                component.instrument.baseExperience,
                masteryXP,
                baseMasteryXP,
                poolXP,
                this.getInstrumentInterval(component.instrument)
            );
        }

        this.renderQueue.grants = false;
    }

    public renderGPRange() {
        if (!this.renderQueue.gpRange) {
            return;
        }

        for (const component of this.userInterface.instruments.values()) {
            component.updateGPRange();
        }

        this.renderQueue.gpRange = false;
    }

    public renderBardModifiers() {
        if (!this.renderQueue.bardModifiers) {
            return;
        }

        this.userInterface.bard1.updateEnabled(true); // Bard 1 is always available.
        this.userInterface.bard2.updateEnabled(this.manager.isBandPracticeUnlocked);

        this.userInterface.bard1.updateModifiers();
        this.userInterface.bard2.updateModifiers();

        this.userInterface.bard1.updateCurrentMasteryLevel();
        this.userInterface.bard2.updateCurrentMasteryLevel();

        this.renderQueue.bardModifiers = false;
    }

    public renderProgressBar() {
        if (!this.renderQueue.progressBar) {
            return;
        }

        const progressBar = this.userInterface.instruments.get(this.activeInstrument)?.progressBar;

        if (progressBar !== this.renderedProgressBar) {
            this.renderedProgressBar?.stopAnimation();
        }

        if (progressBar !== undefined) {
            if (this.isActive) {
                progressBar.animateProgressFromTimer(this.actionTimer);
                this.renderedProgressBar = progressBar;
            } else {
                progressBar.stopAnimation();
                this.renderedProgressBar = undefined;
            }
        }

        this.renderQueue.progressBar = false;
    }

    public renderVisibleInstruments() {
        if (!this.renderQueue.visibleInstruments) {
            return;
        }

        for (const instrument of this.actions.registeredObjects.values()) {
            const menu = this.userInterface.instruments.get(instrument);

            if (menu === undefined) {
                return;
            }

            const element = document.querySelector(`#${menu.localId}`) as HTMLElement;

            if (!element) {
                return;
            }

            if (this.level >= instrument.level) {
                showElement(element);
            } else {
                hideElement(element);
            }
        }

        this.userInterface.locked.update();

        this.renderQueue.visibleInstruments = false;
    }

    public getTotalUnlockedMasteryActions() {
        return this.actions.reduce(levelUnlockSum(this), 0);
    }

    public resetActionState() {
        super.resetActionState();

        this.activeInstrument = undefined;
        this.bards.clear();
    }

    public encode(writer: SaveWriter): SaveWriter {
        super.encode(writer);

        writer.writeUint32(this.version);
        writer.writeBoolean(this.activeInstrument !== undefined);

        if (this.activeInstrument) {
            writer.writeNamespacedObject(this.activeInstrument);
        }

        writer.writeArray(this.actions.allObjects, action => {
            writer.writeNamespacedObject(action);

            const masteriesUnlocked = this.masteriesUnlocked.get(action);

            writer.writeArray(masteriesUnlocked, value => {
                writer.writeBoolean(value);
            });
        });

        writer.writeComplexMap(this.bards.bards, (key, value, writer) => {
            writer.writeNamespacedObject(key);
            writer.writeUint32(value.slot);
            writer.writeBoolean(value.isUpgraded);

            writer.writeBoolean(value.socket !== undefined);

            if (value.socket) {
                const socket = this.game.items.getObjectByID(value.socket.id);

                writer.writeNamespacedObject(socket);
            }

            writer.writeBoolean(value.utility !== undefined);

            if (value.utility) {
                const utility = this.game.items.getObjectByID(value.utility.id);

                writer.writeNamespacedObject(utility);
            }
        });

        return writer;
    }

    public decode(reader: SaveWriter, version: number): void {
        super.decode(reader, version);

        const decoder = new Decoder(this.game, this, reader.byteOffset);

        decoder.decode(reader);
    }

    /** Fix completion log bug which passes through base game namespace even for modded skills. */
    public getMaxTotalMasteryLevels() {
        return super.getMaxTotalMasteryLevels(this.namespace);
    }

    /** Fix completion log bug which passes through base game namespace even for modded skills. */
    public getTotalCurrentMasteryLevels() {
        return super.getTotalCurrentMasteryLevels(this.namespace);
    }

    public getActionIDFromOldID(oldActionID: number, idMap: NumericIDMap) {
        return '';
    }
}

export class MusicRenderQueue extends GatheringSkillRenderQueue<Instrument> {
    grants = false;
    gpRange = false;
    bardModifiers = false;
    visibleInstruments = false;
}
