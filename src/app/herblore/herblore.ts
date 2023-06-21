export class MythHerblore {
    constructor(private readonly context: Modding.ModContext) {}

    public registerPotion() {
        this.context.gameData
            .buildPackage(p => {
                p.skillData.add({
                    skillID: 'melvorD:Herblore',
                    data: {
                        recipes: [
                            {
                                id: 'Generous_Gratuity_Potion',
                                name: 'Generous Gratuity Potion',
                                level: 80,
                                potionIDs: [
                                    'mythMusic:Generous_Gratuity_Potion_I',
                                    'mythMusic:Generous_Gratuity_Potion_II',
                                    'mythMusic:Generous_Gratuity_Potion_III',
                                    'mythMusic:Generous_Gratuity_Potion_IV'
                                ],
                                baseExperience: 140,
                                categoryID: 'melvorF:SkillPotions',
                                itemCosts: [
                                    {
                                        id: 'melvorF:Pigtayle_Herb',
                                        quantity: 1
                                    }
                                ],
                                gpCost: 1000,
                                scCost: 0
                            }
                        ]
                    }
                });
            })
            .add();
    }
}
