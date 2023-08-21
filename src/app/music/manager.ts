import { Music } from './music';
import { BardModifier, Instrument, InstrumentModifier, InstrumentSkillModifier } from './music.types';

export class MusicManager {
    public get elements() {
        const fragment = new DocumentFragment();

        fragment.append(getTemplateNode('myth-music'));

        return [...fragment.children];
    }

    public get essenceOfMusicIcon() {
        return this.game.items.getObjectByID('mythMusic:Essence_Of_Music')?.media;
    }

    public get isBandPracticeUnlocked() {
        return this.game.modifiers.increasedBardHireLimit > 0;
    }

    constructor(private readonly music: Music, private readonly game: Game) {}

    /** Gets modifier metadata. */
    public getModifiers(instrument: Instrument) {
        if (!instrument.id) {
            return [] as BardModifier[];
        }

        return instrument.modifiers(this.music.settings.modifierType).map(modifier => {
            let description = '';

            if (this.isSkillModifier(modifier)) {
                [description] = printPlayerModifier(modifier.key, {
                    skill: this.game.skills.find(skill => skill.id === modifier.skill),
                    value: modifier.value
                });
            } else {
                [description] = printPlayerModifier(modifier.key, modifier.value);
            }

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
            .filter(modifier => this.isModifierActive(instrument, modifier))
            .map(modifier => {
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
            });
    }

    public getGoldToAward(instrument: Instrument) {
        const component = this.music.userInterface.instruments.get(instrument);
        const minRoll = component.getMinGPRoll();
        const maxRoll = component.getMaxGPRoll();

        let gpToAdd = rollInteger(minRoll, maxRoll);
        let gpMultiplier = 1;

        const increasedGPModifier = component.getGPModifier();

        gpMultiplier *= 1 + increasedGPModifier / 100;
        gpToAdd = Math.floor(gpMultiplier * gpToAdd);

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
        let modifier = this.game.modifiers.increasedMusicHireCost - this.game.modifiers.decreasedMusicHireCost;

        if (this.music.isPoolTierActive(3)) {
            modifier -= 5;
        }

        const masteryLevel = this.music.getMasteryLevel(instrument);

        if (masteryLevel >= 90) {
            modifier -= 5;
        }

        return Math.max(modifier, -95);
    }

    private isModifierActive(instrument: Instrument, modifier: InstrumentModifier) {
        instrument = this.music.actions.find(action => action.id === instrument.id);

        let unlockedMasteries = this.music.masteriesUnlocked.get(instrument);

        const bard = this.music.bards.get(instrument);

        const validModifierLevels = instrument
            .modifiers(this.music.settings.modifierType)
            .filter((modifier, index) => unlockedMasteries[index])
            .map(instrument => instrument.level);

        return validModifierLevels.includes(modifier.level) || (bard?.isUpgraded && modifier.level === 999);
    }

    private isSkillModifier(modifier: InstrumentModifier): modifier is InstrumentSkillModifier {
        return 'skill' in modifier;
    }
}
