import { BardComponent } from './bard/bard';
import { InstrumentComponent } from './instrument/instrument';
import { MusicActionEvent } from './event';
import './music.scss';

export interface BardModifiers {
    description: string;
    isActive: boolean;
    isUpgrade: boolean;
    level: number;
}

interface MusicSkillData extends MasterySkillData {
    instruments: InstrumentData[];
}

interface InstrumentModifier {
    level: number;
    key: SkillModifierKeys | StandardModifierKeys;
    value: number;
    skill?: string;
}

interface InstrumentData extends BasicSkillRecipeData {
    name: string;
    media: string;
    baseInterval: number;
    maxGP: number;
    modifiers: InstrumentModifier[];
    skills: string[];
}

export class Music extends GatheringSkill<Instrument, MusicSkillData> {
    public readonly version = 1;
    public readonly _media = 'assets/instruments/guitar.png';
    public readonly renderQueue = new MusicRenderQueue();

    public isBard1Upgraded = false;
    public isBard2Upgraded = false;
    public activeInstrument: Instrument;
    public hiredBard?: Instrument;
    public hiredBard2?: Instrument;

    private renderedProgressBar?: ProgressBar;

    public instruments = new Map<Instrument, ReturnType<typeof InstrumentComponent>>();
    public bardComponent: ReturnType<typeof BardComponent>;
    public bard2Component: ReturnType<typeof BardComponent>;
    public modifiers = new MappedModifiers();

    public get essenceIcon() {
        return this.game.items.getObjectByID('mythMusic:Essence_Of_Music')?.media;
    }

    constructor(namespace: DataNamespace, public readonly game: Game) {
        super(namespace, 'Music', game);
    }

    public elements() {
        const fragment = new DocumentFragment();

        fragment.append(getTemplateNode('myth-music'));

        return [...fragment.children];
    }

    public registerData(namespace: DataNamespace, data: MusicSkillData) {
        super.registerData(namespace, data);

        data.instruments.forEach(instrument => {
            this.actions.registerObject(new Instrument(namespace, instrument));
        });

        loadedLangJson['MASTERY_CHECKPOINT_Music_0'] = '+3% increased Music Skill XP';
        loadedLangJson['MASTERY_CHECKPOINT_Music_1'] = '+5% increased Music Mastery XP';
        loadedLangJson['MASTERY_CHECKPOINT_Music_2'] = 'Decreased Music Interval by 0.25s';
        loadedLangJson['MASTERY_CHECKPOINT_Music_3'] = '-10% Bard Hire Cost';
        loadedLangJson['POTION_NAME_Generous_Gratuity_Potion'] = 'Generous Gratuity Potion';
    }

    public get name() {
        return 'Music';
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

    public getBardModifiers(instrument: Instrument) {
        if (!instrument.id) {
            return [] as BardModifiers[];
        }

        return instrument.modifiers.map((modifier: any) => {
            let description = '';

            if ('skill' in modifier) {
                const mod = { ...modifier };
                mod.skill = this.game.skills.find(skill => skill.id === modifier.skill);
                [description] = printPlayerModifier(modifier.key, mod);
            } else {
                [description] = printPlayerModifier(modifier.key, modifier.value);
            }

            // Need to fetch the exact action to suceed with the mastery level lookup.
            const bard = this.actions.find(action => action.id === instrument.id);
            const masteryLevel = this.getMasteryLevel(bard);

            return {
                description,
                isActive: masteryLevel >= modifier.level || (this.isUpgraded(bard) && modifier.level === 999),
                isUpgrade: modifier.level === 999,
                level: modifier.level
            } as BardModifiers;
        });
    }

    public isUpgraded(instrument: Instrument) {
        const bard = this.actions.find(action => action.id === instrument.id);

        if (this.bardComponent.bard?.id === bard?.id) {
            return this.isBard1Upgraded;
        }

        if (this.bard2Component.bard?.id === bard?.id) {
            return this.isBard2Upgraded;
        }

        return false;
    }

    public upgrade(instrument: Instrument) {
        const bard = this.actions.find(action => action.id === instrument.id);

        if (this.bardComponent.bard?.id === bard?.id) {
            this.isBard1Upgraded = true;
        }

        if (this.bard2Component.bard?.id === bard?.id) {
            this.isBard2Upgraded = true;
        }

        this.computeProvidedStats(true);
    }

    public getHiddenModifierDescriptions(instrument: Instrument) {
        const modifiers = instrument.modifiers.filter(modifier => modifier.level === 999) as any[];

        if (!modifiers?.length) {
            return [];
        }

        let descriptions = [];

        for (const modifier of modifiers) {
            let description = '';

            if ('skill' in modifier) {
                const mod = { ...modifier };
                mod.skill = this.game.skills.find(skill => skill.id === modifier.skill);
                [description] = printPlayerModifier(modifier.key, mod);
            } else {
                [description] = printPlayerModifier(modifier.key, modifier.value);
            }

            descriptions.push(description);
        }

        return descriptions;
    }

    public hire(instrument: Instrument) {
        if (this.hiredBard === instrument) {
            return;
        }

        const hireModifier = this.getHireCostModifier(instrument);
        const hireCost = Math.floor(this.calculateHireCost(instrument) * (1 + hireModifier / 100));

        const canAfford = this.game.gp.amount >= hireCost;

        if (!canAfford) {
            let html = `<h5 class="font-w400 text-combat-smoke font-size-sm mb-2">You cannot afford to hire this bard: <img class="instrument-icon align-middle" src="${
                instrument.media
            }" /> ${instrument.name}</h5><h5 class="text-danger"><img
            class="skill-icon-xs mr-2"
            src="${this.game.gp.media}"
        /> ${numberWithCommas(hireCost)} GP</h5>`;

            for (const modifier of this.getBardModifiers(instrument)) {
                html += `<small class="${modifier.isActive ? 'text-success' : 'myth-text-grey'}">`;

                if (!modifier.isActive) {
                    html += `<span>
                (<img class="skill-icon-xxs mr-1" src="${cdnMedia('assets/media/main/mastery_header.svg')}" /> ${
                        modifier.level
                    })
                </span>`;
                }

                if (modifier.isUpgrade) {
                    html += `<img class="skill-icon-xxs mr-1" src="${this.essenceIcon}" />`;
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
            let html = `<h5 class="font-w400 text-combat-smoke font-size-sm mb-2">Would you like to hire this bard: <img class="instrument-icon align-middle" src="${
                instrument.media
            }" /> ${instrument.name}</h5><h5><img class="skill-icon-xs mr-2" src="${
                this.game.gp.media
            }" /> ${numberWithCommas(hireCost)} GP</h5>`;

            for (const modifier of this.getBardModifiers(instrument)) {
                html += `<small class="${modifier.isActive ? 'text-success' : 'myth-text-grey'}">`;

                if (!modifier.isActive && !modifier.isUpgrade) {
                    html += `<span>
                (<img class="skill-icon-xxs mr-1" src="${cdnMedia('assets/media/main/mastery_header.svg')}" /> ${
                        modifier.level
                    })
                </span>`;
                }

                if (modifier.isUpgrade) {
                    html += `<img class="skill-icon-xxs mr-1" src="${this.essenceIcon}" />`;
                }

                html += `<span>${modifier.description}</span></small><br />`;
            }

            html += `<h5 class="font-w600 text-danger font-size-sm mt-3 mb-1">This will replace the hired bard that is selected and destroys the upgrade on the instrument.</h5>`;

            SwalLocale.fire({
                html,
                showCancelButton: true,
                showDenyButton: this.isBard2Unlocked(),
                icon: 'info',
                confirmButtonText: this.hiredBard ? `Replace ${this.hiredBard.name}` : 'Hire',
                denyButtonText: this.hiredBard2 ? `Replace ${this.hiredBard2.name}` : 'Hire'
            }).then(result => {
                if (result.isDismissed) {
                    return;
                }

                this.game.gp.remove(hireCost);

                if (result.isConfirmed) {
                    this.hiredBard = instrument;
                    this.isBard1Upgraded = false;
                    this.bardComponent.setBard(this.hiredBard, this.isBard1Upgraded);
                }

                if (result.isDenied) {
                    this.hiredBard2 = instrument;
                    this.isBard2Upgraded = false;
                    this.bard2Component.setBard(this.hiredBard2, this.isBard2Upgraded);
                }

                this.computeProvidedStats(true);

                this.instruments.forEach(component => {
                    component.updateDisabled();
                });
            });
        }
    }

    private calculateHireCost(instrument: Instrument) {
        const minValue = 10000;
        const maxValue = 200000000;

        let masteryLevel = this.getMasteryLevel(instrument);

        // Ensure the mastery level is within the valid range
        if (masteryLevel < 1) {
            masteryLevel = 1;
        }

        if (masteryLevel > 99) {
            masteryLevel = 99;
        }

        // Calculate the base value for the exponential function
        const base = Math.pow(maxValue / minValue, 1 / 98);

        // Calculate the exponential value at the specified index
        const exponentialValue = minValue * Math.pow(base, masteryLevel - 1);

        // Round the exponential value to the nearest appropriate value
        const roundedValue = Math.round(exponentialValue / 1000) * 1000;

        return roundedValue;
    }

    private getHireCostModifier(instrument: Instrument) {
        let modifier = this.game.modifiers.increasedMusicHireCost - this.game.modifiers.decreasedMusicHireCost;

        if (this.isPoolTierActive(3)) {
            modifier -= 10;
        }

        const masteryLevel = this.getMasteryLevel(instrument);

        if (masteryLevel >= 90) {
            modifier -= 10;
        }

        return Math.max(modifier, -95);
    }

    public getInstrumentInterval(instrument: Instrument) {
        return this.modifyInterval(instrument.baseInterval, instrument);
    }

    public getFlatIntervalModifier(action: Instrument) {
        let modifier = super.getFlatIntervalModifier(action);

        if (this.isPoolTierActive(2)) {
            modifier -= 250;
        }

        return modifier;
    }

    public onLoad() {
        super.onLoad();
        this.actions.forEach(instrument => {
            this.renderQueue.actionMastery.add(instrument);
        });
        this.computeProvidedStats(false);
        this.renderQueue.grants = true;
        this.renderQueue.bardModifiers = true;
        this.renderQueue.visibleInstruments = true;
        if (this.isActive) {
            this.renderQueue.progressBar = true;
        }
        this.instruments.forEach(component => {
            component.updateDisabled();
        });
    }

    public onLevelUp(oldLevel: number, newLevel: number) {
        super.onLevelUp(oldLevel, newLevel);
        this.renderQueue.visibleInstruments = true;
    }

    public onMasteryLevelUp(action: Instrument, oldLevel: number, newLevel: number): void {
        super.onMasteryLevelUp(action, oldLevel, newLevel);
        this.renderQueue.gpRange = true;
        this.renderQueue.bardModifiers = true;

        if (newLevel >= action.level) {
            this.computeProvidedStats(true);
        }
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

    postDataRegistration() {
        super.postDataRegistration();
        this.sortedMasteryActions = this.actions.allObjects.sort((a, b) => a.level - b.level);
        this.milestones.push(...this.actions.allObjects);
        this.sortMilestones();
    }

    public preAction() {}

    public postAction() {
        this.renderQueue.grants = true;
    }

    public onEquipmentChange() {}

    public computeProvidedStats(updatePlayer = true) {
        this.modifiers.reset();

        if (this.hiredBard) {
            const modifiers = this.getModifiers(this.hiredBard);
            this.modifiers.addArrayModifiers(modifiers);
        }

        if (this.hiredBard2) {
            const modifiers = this.getModifiers(this.hiredBard2);
            this.modifiers.addArrayModifiers(modifiers);
        }

        if (updatePlayer) {
            this.game.combat.player.computeAllStats();
        }
    }

    public get actionRewards() {
        const rewards = new Rewards(this.game);
        const actionEvent = new MusicActionEvent(this, this.activeInstrument);
        rewards.addXP(this, this.activeInstrument.baseExperience);
        rewards.addGP(this.getGoldToAward(this.activeInstrument));
        this.addCommonRewards(rewards);
        this.game.processEvent(actionEvent, this.currentActionInterval);

        return rewards;
    }

    private getGoldToAward(instrument: Instrument) {
        const component = this.instruments.get(instrument);
        const minRoll = component.getMinGPRoll();
        const maxRoll = component.getMaxGPRoll();

        let gpToAdd = rollInteger(minRoll, maxRoll);
        let gpMultiplier = 1;

        const increasedGPModifier = component.getGPModifier();

        gpMultiplier *= 1 + increasedGPModifier / 100;
        gpToAdd = Math.floor(gpMultiplier * gpToAdd);

        return gpToAdd;
    }

    public getModifiers(instrument: Instrument) {
        if (this.level < instrument.level) {
            return [];
        }

        const masteryLevel = this.getMasteryLevel(instrument);

        return instrument.modifiers
            .filter(
                modifier => masteryLevel >= modifier.level || (modifier.level === 999 && this.isUpgraded(instrument))
            )
            .map(modifier => this.getModifierElement(modifier));
    }

    public getModifierElement(modifier: InstrumentModifier): ModifierArrayElement {
        if ('skill' in modifier) {
            return {
                key: modifier.key,
                values: [
                    {
                        skill: this.game.skills.find(skill => skill.id === modifier.skill),
                        value: modifier.value
                    }
                ]
            } as SkillModifierArrayElement;
        } else {
            return {
                key: modifier.key,
                value: modifier.value
            } as StandardModifierArrayElement;
        }
    }

    getXPModifier(masteryAction: NamespacedObject) {
        let modifier = super.getXPModifier(masteryAction);

        if (this.isPoolTierActive(0)) {
            modifier += 3;
        }

        return modifier;
    }

    getMasteryXPModifier(action: Instrument) {
        let modifier = super.getMasteryXPModifier(action);

        if (this.isPoolTierActive(1)) {
            modifier += 5;
        }

        return modifier;
    }

    public renderGrants() {
        if (!this.renderQueue.grants) {
            return;
        }

        this.instruments.forEach(component => {
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
        });

        this.renderQueue.grants = false;
    }

    public renderGPRange() {
        if (!this.renderQueue.gpRange) {
            return;
        }

        this.instruments.forEach(component => {
            component.updateGPRange();
        });

        this.renderQueue.gpRange = false;
    }

    public renderBardModifiers() {
        if (!this.renderQueue.bardModifiers) {
            return;
        }

        this.bardComponent.updateEnabled(true);
        this.bard2Component.updateEnabled(this.isBard2Unlocked());

        this.bardComponent.updateModifiers();
        this.bard2Component.updateModifiers();

        this.renderQueue.bardModifiers = false;
    }

    public renderProgressBar() {
        if (!this.renderQueue.progressBar) {
            return;
        }

        const progressBar = this.instruments.get(this.activeInstrument)?.progressBar;

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

        this.actions.forEach(instrument => {
            const menu = this.instruments.get(instrument);

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
        });

        this.renderQueue.visibleInstruments = false;
    }

    public getTotalUnlockedMasteryActions() {
        return this.actions.reduce(levelUnlockSum(this), 0);
    }

    public getErrorLog() {
        return '';
    }

    public resetActionState() {
        super.resetActionState();
        this.activeInstrument = undefined;
        this.hiredBard = undefined;
    }

    public isBard2Unlocked() {
        return this.game.modifiers.increasedBardHireLimit > 0;
    }

    public encode(writer: SaveWriter): SaveWriter {
        super.encode(writer);

        writer.writeString(`mythMusicVersion:${this.version}:`);
        writer.writeBoolean(this.activeInstrument !== undefined);

        if (this.activeInstrument) {
            writer.writeNamespacedObject(this.activeInstrument);
        }

        writer.writeBoolean(this.hiredBard !== undefined);

        if (this.hiredBard) {
            writer.writeNamespacedObject(this.hiredBard);
            writer.writeBoolean(this.isBard1Upgraded);
        }

        writer.writeBoolean(this.hiredBard2 !== undefined);

        if (this.hiredBard2) {
            writer.writeNamespacedObject(this.hiredBard2);
            writer.writeBoolean(this.isBard2Upgraded);
        }

        return writer;
    }

    public decode(reader: SaveWriter, version: number): void {
        let start = reader.byteOffset;

        try {
            super.decode(reader, version);

            const preVersionBytes = reader.byteOffset;
            const skillVersionString = reader.getString();
            const skillVersion = this.getVersion(skillVersionString);

            if (!skillVersion) {
                reader.byteOffset = preVersionBytes;
            }

            if (reader.getBoolean()) {
                const instrument = reader.getNamespacedObject(this.actions);
                if (typeof instrument === 'string' || instrument.level > this.level) {
                    this.shouldResetAction = true;
                } else {
                    this.activeInstrument = instrument;
                }
            }

            if (reader.getBoolean()) {
                const instrument = reader.getNamespacedObject(this.actions);

                if (typeof instrument === 'string' || instrument.level > this.level) {
                    this.shouldResetAction = true;
                } else {
                    this.hiredBard = instrument;

                    if (skillVersion >= 1 && reader.getBoolean()) {
                        this.isBard1Upgraded = true;
                    }

                    this.bardComponent.setBard(this.hiredBard, this.isBard1Upgraded);
                }
            }

            if (skillVersion >= 1 && reader.getBoolean()) {
                const instrument = reader.getNamespacedObject(this.actions);

                if (typeof instrument === 'string' || instrument.level > this.level) {
                    this.shouldResetAction = true;
                } else {
                    this.hiredBard2 = instrument;

                    if (reader.getBoolean()) {
                        this.isBard2Upgraded = true;
                    }

                    this.bard2Component.setBard(this.hiredBard2, this.isBard2Upgraded);
                }
            }

            if (this.shouldResetAction) {
                this.resetActionState();
            }
        } catch (e) {
            console.log(e);
            reader.byteOffset = start;
        }
    }

    /**
     * Not a good way of doing this, I should have saved a version since the initial release.
     * Gotta do it this stupid way now so that I don't brick existing saves.
     */
    private getVersion(str: string) {
        if (str.includes('mythMusicVersion')) {
            try {
                return parseInt(str.split('mythMusicVersion:')[1].split(':')[0]);
            } catch (e) {
                return 1;
            }
        }

        return 0;
    }

    public getActionIDFromOldID(oldActionID: number, idMap: NumericIDMap) {
        return '';
    }
}

export class Instrument extends BasicSkillRecipe {
    baseInterval: number;
    maxGP: number;
    modifiers: InstrumentModifier[];
    skills: string[];

    public get name() {
        return this.data.name;
    }

    public get media() {
        return this.getMediaURL(this.data.media);
    }

    constructor(namespace: DataNamespace, private readonly data: InstrumentData) {
        super(namespace, data);

        this.baseInterval = data.baseInterval;
        this.maxGP = data.maxGP;
        this.modifiers = data.modifiers;
        this.skills = data.skills;
    }
}

export class MusicRenderQueue extends GatheringSkillRenderQueue<Instrument> {
    grants = false;
    gpRange = false;
    bardModifiers = false;
    visibleInstruments = false;
}
