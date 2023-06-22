import { Instrument, Music } from './music';
import { BardModifier, InstrumentModifier, InstrumentSkillModifier } from './music.types';

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

    public isUpgraded(instrument: Instrument) {
        const bard = this.music.actions.find(action => action.id === instrument.id);

        if (this.music.userInterface.bard1.bard?.id === bard?.id) {
            return this.music.isBard1Upgraded;
        }

        if (this.music.userInterface.bard2.bard?.id === bard?.id) {
            return this.music.isBard2Upgraded;
        }

        return false;
    }

    /** Gets modifier metadata. */
    public getModifiers(instrument: Instrument) {
        if (!instrument.id) {
            return [] as BardModifier[];
        }

        return instrument.modifiers.map(modifier => {
            let description = '';

            if (this.isSkillModifier(modifier)) {
                [description] = printPlayerModifier(modifier.key, {
                    skill: this.game.skills.find(skill => skill.id === modifier.skill),
                    value: modifier.value
                });
            } else {
                [description] = printPlayerModifier(modifier.key, modifier.value);
            }

            // Need to fetch the exact action to suceed with the mastery level lookup.
            const bard = this.music.actions.find(action => action.id === instrument.id);
            const masteryLevel = this.music.getMasteryLevel(bard);

            return {
                description,
                isActive: masteryLevel >= modifier.level || (this.isUpgraded(bard) && modifier.level === 999),
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

        const masteryLevel = this.music.getMasteryLevel(instrument);

        return instrument.modifiers
            .filter(
                modifier => masteryLevel >= modifier.level || (modifier.level === 999 && this.isUpgraded(instrument))
            )
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
        const minValue = 10000;
        const maxValue = 200000000;

        let masteryLevel = this.music.getMasteryLevel(instrument);

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

    public getHireCostModifier(instrument: Instrument) {
        let modifier = this.game.modifiers.increasedMusicHireCost - this.game.modifiers.decreasedMusicHireCost;

        if (this.music.isPoolTierActive(3)) {
            modifier -= 10;
        }

        const masteryLevel = this.music.getMasteryLevel(instrument);

        if (masteryLevel >= 90) {
            modifier -= 10;
        }

        return Math.max(modifier, -95);
    }

    private isSkillModifier(modifier: InstrumentModifier): modifier is InstrumentSkillModifier {
        return 'skill' in modifier;
    }
}
