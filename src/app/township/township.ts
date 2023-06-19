interface Upgrades {
    hat: ItemUpgrade;
    body: ItemUpgrade;
    leggings: ItemUpgrade;
    boots: ItemUpgrade;
}

export class Township {
    public readonly eventItemIds = ['mythMusic:Music_Scroll_Of_XP'];

    constructor(private readonly context: Modding.ModContext) {}

    public registerTraderItems() {
        const upgrades = this.getRootUpgrades();

        this.context.gameData
            .buildPackage(builder => {
                builder.skillData.add({
                    skillID: 'melvorD:Township',
                    data: {
                        itemConversions: {
                            toTownship: [],
                            fromTownship: [
                                {
                                    resourceID: 'melvorF:Planks',
                                    items: [
                                        {
                                            itemID: 'mythMusic:Music_Scroll_Of_XP',
                                            unlockRequirements: [
                                                { type: 'SkillLevel', skillID: 'mythMusic:Music', level: 15 },
                                                { type: 'SkillLevel', skillID: 'melvorD:Township', level: 15 }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                });

                this.clearItemUpgrades(upgrades);
                this.setHatUpgrade(builder, upgrades);
                this.setBodyUpgrade(builder, upgrades);
                this.setLeggingsUpgrade(builder, upgrades);
                this.setBootsUpgrade(builder, upgrades);

                builder.itemSynergies.add({
                    itemIDs: [
                        'mythMusic:Bards_Hat',
                        'mythMusic:Bards_Body',
                        'mythMusic:Bards_Leggings',
                        'mythMusic:Bards_Boots'
                    ],
                    playerModifiers: {
                        increasedMasteryXP: [
                            {
                                skillID: 'mythMusic:Music',
                                value: 8
                            }
                        ]
                    }
                });
            })
            .add();

        this.modifyTradeOrder();
    }

    private modifyTradeOrder() {
        // Switch order if trades so scroll of xp is first.
        const planks = game.township.resources.getObjectByID('melvorF:Planks');
        const trades = game.township.itemConversions.fromTownship.get(planks);

        const scrollOfMusicXP = trades.find(trade => trade.item.id === 'mythMusic:Music_Scroll_Of_XP');

        trades.splice(trades.indexOf(scrollOfMusicXP), 1);
        trades.splice(0, 0, scrollOfMusicXP);

        game.township.itemConversions.fromTownship.set(planks, trades);
    }

    private getRootUpgrades(): Upgrades {
        return {
            hat: game.bank.itemUpgrades.get(game.items.getObjectByID('melvorF:Woodcutters_Hat'))[0],
            body: game.bank.itemUpgrades.get(game.items.getObjectByID('melvorF:Woodcutters_Body'))[0],
            leggings: game.bank.itemUpgrades.get(game.items.getObjectByID('melvorF:Woodcutters_Leggings'))[0],
            boots: game.bank.itemUpgrades.get(game.items.getObjectByID('melvorF:Woodcutters_Boots'))[0]
        };
    }

    private getItemCosts(itemUpgrade: ItemUpgrade) {
        return itemUpgrade.itemCosts.filter(cost => cost.item.id !== 'melvorF:Skilling_Outfit_Upgrade');
    }

    private clearItemUpgrades({ hat, body, leggings, boots }: Upgrades) {
        for (const cost of this.getItemCosts(hat)) {
            game.bank.itemUpgrades.delete(cost.item);
        }

        for (const cost of this.getItemCosts(body)) {
            game.bank.itemUpgrades.delete(cost.item);
        }

        for (const cost of this.getItemCosts(leggings)) {
            game.bank.itemUpgrades.delete(cost.item);
        }

        for (const cost of this.getItemCosts(boots)) {
            game.bank.itemUpgrades.delete(cost.item);
        }
    }

    private setHatUpgrade(builder: Modding.GameDataPackageBuilder, { hat }: Upgrades) {
        const costs = this.getItemCosts(hat);

        builder.itemUpgrades.add({
            upgradedItemID: 'melvorF:Skillers_Hat',
            gpCost: 0,
            scCost: 0,
            itemCosts: [
                {
                    id: 'melvorF:Skilling_Outfit_Upgrade',
                    quantity: 1
                },
                ...costs.map(cost => ({ id: cost.item.id, quantity: 1 })),
                {
                    id: 'mythMusic:Bards_Hat',
                    quantity: 1
                }
            ],
            rootItemIDs: [...costs.map(cost => cost.item.id), 'mythMusic:Bards_Hat'],
            isDowngrade: false
        });
    }

    private setBodyUpgrade(builder: Modding.GameDataPackageBuilder, { body }: Upgrades) {
        const costs = this.getItemCosts(body);

        builder.itemUpgrades.add({
            upgradedItemID: 'melvorF:Skillers_Body',
            gpCost: 0,
            scCost: 0,
            itemCosts: [
                {
                    id: 'melvorF:Skilling_Outfit_Upgrade',
                    quantity: 1
                },
                ...costs.map(cost => ({ id: cost.item.id, quantity: 1 })),
                {
                    id: 'mythMusic:Bards_Body',
                    quantity: 1
                }
            ],
            rootItemIDs: [...costs.map(cost => cost.item.id), 'mythMusic:Bards_Body'],
            isDowngrade: false
        });
    }

    private setLeggingsUpgrade(builder: Modding.GameDataPackageBuilder, { leggings }: Upgrades) {
        const costs = this.getItemCosts(leggings);

        builder.itemUpgrades.add({
            upgradedItemID: 'melvorF:Skillers_Leggings',
            gpCost: 0,
            scCost: 0,
            itemCosts: [
                {
                    id: 'melvorF:Skilling_Outfit_Upgrade',
                    quantity: 1
                },
                ...costs.map(cost => ({ id: cost.item.id, quantity: 1 })),
                {
                    id: 'mythMusic:Bards_Leggings',
                    quantity: 1
                }
            ],
            rootItemIDs: [...costs.map(cost => cost.item.id), 'mythMusic:Bards_Leggings'],
            isDowngrade: false
        });
    }

    private setBootsUpgrade(builder: Modding.GameDataPackageBuilder, { boots }: Upgrades) {
        const costs = this.getItemCosts(boots);

        builder.itemUpgrades.add({
            upgradedItemID: 'melvorF:Skillers_Boots',
            gpCost: 0,
            scCost: 0,
            itemCosts: [
                {
                    id: 'melvorF:Skilling_Outfit_Upgrade',
                    quantity: 1
                },
                ...costs.map(cost => ({ id: cost.item.id, quantity: 1 })),
                {
                    id: 'mythMusic:Bards_Boots',
                    quantity: 1
                }
            ],
            rootItemIDs: [...costs.map(cost => cost.item.id), 'mythMusic:Bards_Boots'],
            isDowngrade: false
        });
    }
}
