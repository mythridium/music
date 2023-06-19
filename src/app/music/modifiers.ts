export class Modifiers {
    public registerModifiers() {
        const data = modifierData as any;

        data['increasedMusicHireCost'] = {
            get langDescription() {
                return '+${value}% Bard Hire Cost';
            },
            description: '+${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        data['decreasedMusicHireCost'] = {
            get langDescription() {
                return '-${value}% Bard Hire Cost';
            },
            description: '-${value}% Bard Hire Cost',
            isSkill: false,
            isNegative: false,
            tags: []
        };

        data['increasedMusicGP'] = {
            get langDescription() {
                return '+${value}% Music GP';
            },
            description: '+${value}% Music GP',
            isSkill: false,
            isNegative: true,
            tags: []
        };

        data['decreasedMusicGP'] = {
            get langDescription() {
                return '-${value}% Music GP';
            },
            description: '-${value}% Music GP',
            isSkill: false,
            isNegative: false,
            tags: []
        };
    }
}
