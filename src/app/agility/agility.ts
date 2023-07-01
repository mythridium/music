import { Music } from '../music/music';

export class MythAgility {
    constructor(private readonly game: Game, private readonly music: Music) {}

    public register() {
        const waterfall = this.game.agility.actions.registeredObjects.get('melvorF:Waterfall');

        waterfall.modifiers.decreasedSkillIntervalPercent.push({
            skill: this.music,
            value: 5
        });

        waterfall.modifiers.increasedSkillXP.push({
            skill: this.music,
            value: 5
        });

        waterfall.modifiers.increasedMasteryXP.push({
            skill: this.music,
            value: 5
        });

        this.game.agility.actions.registeredObjects.set('melvorF:Waterfall', waterfall);
    }
}
