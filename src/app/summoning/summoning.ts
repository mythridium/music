import { synergies } from './synergies';

export class MythSummoning {
    constructor(private readonly context: Modding.ModContext) {}

    public register() {
        this.context.gameData
            .buildPackage(p => {
                p.skillData.add({
                    skillID: 'melvorD:Summoning',
                    data: {
                        recipes: [
                            {
                                id: 'Bard',
                                level: 90,
                                productID: 'mythMusic:Summoning_Familiar_Bard',
                                baseQuantity: 25,
                                baseExperience: 41,
                                categoryID: 'melvorD:TabletsFamiliars',
                                itemCosts: [
                                    {
                                        id: 'melvorF:Summoning_Shard_Green',
                                        quantity: 10
                                    },
                                    {
                                        id: 'melvorF:Summoning_Shard_Silver',
                                        quantity: 8
                                    },
                                    {
                                        id: 'melvorF:Summoning_Shard_Black',
                                        quantity: 6
                                    }
                                ],
                                gpCost: 1000,
                                scCost: 0,
                                markMedia: 'assets/summoning/bard-mark.png',
                                nonShardItemCosts: [],
                                tier: 3,
                                skillIDs: ['mythMusic:Music']
                            }
                        ],
                        synergies
                    }
                });
            })
            .add();
    }
}
