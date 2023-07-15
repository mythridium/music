declare global {
    interface StandardModifierObject<Standard> extends CombatModifierObject<Standard> {
        increasedMusicHireCost: Standard;
        decreasedMusicHireCost: Standard;
        increasedMusicGP: Standard;
        decreasedMusicGP: Standard;
        increasedBardHireLimit: Standard;
        decreasedBardHireLimit: Standard;
        increasedSheetMusicDropRate: Standard;
        decreasedSheetMusicDropRate: Standard;
        increasedMusicAdditionalRewardRoll: Standard;
        decreasedMusicAdditionalRewardRoll: Standard;
    }

    interface SkillModifierObject<Skill> {
        increasedSkillMasteryXPPerVariel: Skill;
    }

    interface PlayerModifiers {
        increasedMusicHireCost: number;
        decreasedMusicHireCost: number;
        increasedMusicGP: number;
        decreasedMusicGP: number;
        increasedBardHireLimit: number;
        decreasedBardHireLimit: number;
        increasedSheetMusicDropRate: number;
        decreasedSheetMusicDropRate: number;
        increasedMusicAdditionalRewardRoll: number;
        decreasedMusicAdditionalRewardRoll: number;
        increasedSkillMasteryXPPerVariel: number;
    }
}

export class MythModifiers {
    public registerModifiers() {
        modifierData.increasedMusicHireCost = {
            get langDescription() {
                return '+${value}% Bard Hire Cost';
            },
            description: '+${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.decreasedMusicHireCost = {
            get langDescription() {
                return '-${value}% Bard Hire Cost';
            },
            description: '-${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.increasedMusicGP = {
            get langDescription() {
                return '+${value}% Music GP';
            },
            description: '+${value}% Music GP',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.decreasedMusicGP = {
            get langDescription() {
                return '-${value}% Music GP';
            },
            description: '-${value}% Music GP',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.increasedBardHireLimit = {
            get langDescription() {
                return '+${value} Bard Hire Limit';
            },
            description: '+${value} Bard Hire Limit',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedBardHireLimit = {
            get langDescription() {
                return '-${value} Bard Hire Limit';
            },
            description: '-${value} Bard Hire Limit',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedSheetMusicDropRate = {
            get langDescription() {
                return '+${value}% Sheet Music drop chance';
            },
            description: '+${value}% Sheet Music drop chance',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedSheetMusicDropRate = {
            get langDescription() {
                return '-${value}% Sheet Music drop chance';
            },
            description: '-${value}% Sheet Music drop chance',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedMusicAdditionalRewardRoll = {
            get langDescription() {
                return '+${value} additional reward roll while training Music';
            },
            description: '+${value} additional reward roll while training Music',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedMusicAdditionalRewardRoll = {
            get langDescription() {
                return '-${value} additional reward roll while training Music';
            },
            description: '-${value} additional reward roll while training Music',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedSkillMasteryXPPerVariel = {
            get langDescription() {
                return '+${value}% ${skillName} Mastery XP per maxed Star in Variel constellation in Astrology';
            },
            description: '+${value}% ${skillName} Mastery XP per maxed Star in Variel constellation in Astrology',
            isSkill: true,
            isNegative: false,
            tags: []
        };
    }
}
