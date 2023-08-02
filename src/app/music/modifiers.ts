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
                return getLangString('Myth_Music_Bard_Hire_Cost_Positive');
            },
            description: '+${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.decreasedMusicHireCost = {
            get langDescription() {
                return getLangString('Myth_Music_Bard_Hire_Cost_Negative');
            },
            description: '-${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.increasedMusicGP = {
            get langDescription() {
                return getLangString('Myth_Music_Music_GP_Positive');
            },
            description: '+${value}% Music GP',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.decreasedMusicGP = {
            get langDescription() {
                return getLangString('Myth_Music_Music_GP_Negative');
            },
            description: '-${value}% Music GP',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.increasedBardHireLimit = {
            get langDescription() {
                return getLangString('Myth_Music_Bard_Hire_Limit_Positive');
            },
            description: '+${value} Bard Hire Limit',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedBardHireLimit = {
            get langDescription() {
                return getLangString('Myth_Music_Bard_Hire_Limit_Negative');
            },
            description: '-${value} Bard Hire Limit',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedSheetMusicDropRate = {
            get langDescription() {
                return getLangString('Myth_Music_Sheet_Music_Drop_Chance_Positive');
            },
            description: '+${value}% Sheet Music drop chance',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedSheetMusicDropRate = {
            get langDescription() {
                return getLangString('Myth_Music_Sheet_Music_Drop_Chance_Negative');
            },
            description: '-${value}% Sheet Music drop chance',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedMusicAdditionalRewardRoll = {
            get langDescription() {
                return getLangString('Myth_Music_Additional_Reward_Roll_Positive');
            },
            description: '+${value} additional reward roll while training Music',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        modifierData.decreasedMusicAdditionalRewardRoll = {
            get langDescription() {
                return getLangString('Myth_Music_Additional_Reward_Roll_Negative');
            },
            description: '-${value} additional reward roll while training Music',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        modifierData.increasedSkillMasteryXPPerVariel = {
            get langDescription() {
                return getLangString('Myth_Music_Increased_Mastery_XP_Per_Variel');
            },
            description: '+${value}% ${skillName} Mastery XP per maxed Star in Variel constellation in Astrology',
            isSkill: true,
            isNegative: false,
            tags: []
        };
    }
}
