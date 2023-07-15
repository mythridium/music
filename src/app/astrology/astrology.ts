import { Music } from '../music/music';

export class MythAstrology {
    constructor(private readonly game: Game, private readonly music: Music) {}

    public register() {
        if (!cloudManager.hasTotHEntitlement) {
            return;
        }

        const variel = this.game.astrology.actions.registeredObjects.get('melvorTotH:Variel');

        for (const astrologyModifier of variel.standardModifiers) {
            for (const modifier of [...astrologyModifier.modifiers]) {
                if (modifier.key === 'increasedSkillXP') {
                    astrologyModifier.modifiers.push({
                        key: 'increasedSkillXP',
                        skill: this.music
                    });
                }

                if (modifier.key === 'increasedMasteryXP') {
                    astrologyModifier.modifiers.push({
                        key: 'increasedMasteryXP',
                        skill: this.music
                    });
                }
            }
        }

        for (const astrologyModifier of variel.uniqueModifiers) {
            for (const modifier of [...astrologyModifier.modifiers]) {
                if (modifier.key === 'decreasedSkillIntervalPercent') {
                    astrologyModifier.modifiers.push({
                        key: 'decreasedSkillIntervalPercent',
                        skill: this.music
                    });
                }
            }
        }

        variel.skills.push(this.music);
        variel.masteryXPModifier = 'increasedSkillMasteryXPPerVariel';

        this.game.astrology.actions.registeredObjects.set('melvorTotH:Variel', variel);
    }
}
