import { Music } from './music';
import { BardModifier, Instrument } from './music.types';

export class MusicManager {
    public get elements() {
        const fragment = new DocumentFragment();

        fragment.append(getTemplateNode('myth-music'));

        return [...Array.from(fragment.children)];
    }

    public get essenceOfMusicIcon() {
        return this.game.items.getObjectByID('mythMusic:Essence_Of_Music')?.media;
    }

    public get isBandPracticeUnlocked() {
        // @ts-ignore // TODO: TYPES
        return this.game.modifiers.getValue('mythMusic:bandPractice', {}) > 0;
    }

    public get isMasterAncientRelicUnlocked() {
        // @ts-ignore // TODO: TYPES
        return this.game.modifiers.getValue('mythMusic:masterAncientRelic', {}) > 0;
    }

    constructor(private readonly music: Music, private readonly game: Game) {}

    /** Gets modifier metadata. */
    public getModifiers(instrument: Instrument) {
        if (!instrument.id) {
            return [] as BardModifier[];
        }

        return instrument.modifiers(this.music.settings.modifierType).map(modifier => {
            let description = modifier.describePlain();

            return {
                description,
                isActive: this.isModifierActive(instrument, modifier),
                isUpgrade: modifier.level === 999,
                level: modifier.level
            } as BardModifier;
        });
    }

    /** Gets modifiers and constructs object needed to apply the modifier to the player. */
    public getModifiersForApplication(instrument: Instrument) {
        if (this.music.level < instrument.level) {
            return [];
        }

        return instrument
            .modifiers(this.music.settings.modifierType)
            .filter(modifier => this.isModifierActive(instrument, modifier));
    }

    public getGoldToAward(instrument: Instrument) {
        const component = this.music.userInterface.instruments.get(instrument);
        const minRoll = component.getMinGPRoll();
        const maxRoll = component.getMaxGPRoll();

        let gpToAdd = rollInteger(minRoll, maxRoll);
        let gpMultiplier = 1;

        const increasedGPModifier = component.getGPModifier();

        gpMultiplier *= 1 + increasedGPModifier / 100;
        gpToAdd = Math.floor(
            // @ts-ignore // TODO: TYPES
            gpMultiplier * gpToAdd + this.game.modifiers.getValue('melvorD:flatCurrencyGain', this.game.gp.modQuery)
        );

        return gpToAdd;
    }

    public calculateHireCost(instrument: Instrument) {
        const hireCostMap = [
            this.music.settings.bardHireCostOne || 10000,
            this.music.settings.bardHireCostTwo || 100000,
            this.music.settings.bardHireCostThree || 1000000,
            this.music.settings.bardHireCostFour || 10000000
        ];
        const instrumentRef = this.music.actions.find(action => action.id === instrument.id);
        const unlocked = this.music.masteriesUnlocked.get(instrumentRef).filter(isUnlocked => isUnlocked).length;

        return { costs: hireCostMap, unlocked };
    }

    public getHireCostModifier(instrument: Instrument) {
        // @ts-ignore // TODO: TYPES
        let modifier = this.game.modifiers.getValue(
            'mythMusic:musicHireCost',
            // @ts-ignore // TODO: TYPES
            this.music.getActionModifierQuery(instrument)
        );

        return Math.max(modifier, -95);
    }

    private isModifierActive(instrument: Instrument, modifier: StatObject) {
        instrument = this.music.actions.find(action => action.id === instrument.id);

        let unlockedMasteries = this.music.masteriesUnlocked.get(instrument);

        const bard = this.music.bards.get(instrument);

        const validModifierLevels = instrument
            .modifiers(this.music.settings.modifierType)
            .filter((modifier, index) => unlockedMasteries[index])
            .map(modifier => modifier.level);

        return validModifierLevels.includes(modifier.level) || (bard?.isUpgraded && modifier.level === 999);
    }
}
