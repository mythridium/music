declare global {
    interface StandardModifierObject<Standard> extends CombatModifierObject<Standard> {
        increasedMusicHireCost: Standard;
        decreasedMusicHireCost: Standard;
        increasedMusicGP: Standard;
        decreasedMusicGP: Standard;
        increasedBardHireLimit: Standard;
        decreasedBardHireLimit: Standard;
    }

    interface PlayerModifiers {
        increasedMusicHireCost: number;
        decreasedMusicHireCost: number;
        increasedMusicGP: number;
        decreasedMusicGP: number;
        increasedBardHireLimit: number;
        decreasedBardHireLimit: number;
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
    }
}
