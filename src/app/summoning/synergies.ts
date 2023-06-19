export const synergies: SummoningSynergyData[] = [
    {
        summonIDs: ['melvorF:GolbinThief', 'mythMusic:Bard'],
        modifiers: {
            increasedGPOnEnemyHit: 30
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Occultist', 'mythMusic:Bard'],
        modifiers: {
            increasedGlobalEvasion: 10
        },
        enemyModifiers: {
            decreasedGlobalEvasion: 10
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Wolf', 'mythMusic:Bard'],
        modifiers: {
            increasedLifesteal: 2
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Ent', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceAdditionalSkillResource: [
                {
                    skillID: 'melvorD:Woodcutting',
                    value: 10
                }
            ]
        },
        consumesOn: [
            {
                type: 'WoodcuttingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Mole', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceAdditionalSkillResource: [
                {
                    skillID: 'melvorD:Mining',
                    value: 3
                }
            ]
        },
        consumesOn: [
            {
                type: 'MiningAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Octopus', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceAdditionalSkillResource: [
                {
                    skillID: 'melvorD:Fishing',
                    value: 3
                }
            ]
        },
        consumesOn: [
            {
                type: 'FishingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Minotaur', 'mythMusic:Bard'],
        modifiers: {
            increasedMeleeMaxHit: 3,
            increasedMeleeAccuracyBonus: 3
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Centaur', 'mythMusic:Bard'],
        modifiers: {
            increasedRangedMaxHit: 3,
            increasedRangedAccuracyBonus: 3
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Witch', 'mythMusic:Bard'],
        modifiers: {
            increasedMagicMaxHit: 3,
            increasedMagicAccuracyBonus: 3
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Pig', 'mythMusic:Bard'],
        modifiers: {
            increasedSkillPreservationChance: [
                {
                    skillID: 'melvorD:Cooking',
                    value: 10
                }
            ]
        },
        consumesOn: [
            {
                type: 'CookingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Crow', 'mythMusic:Bard'],
        modifiers: {
            increasedAdditionalRunecraftCountRunes: 2
        },
        consumesOn: [
            {
                type: 'RunecraftingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Leprechaun', 'mythMusic:Bard'],
        modifiers: {
            increasedGPFromThievingFlat: 50
        },
        consumesOn: [
            {
                type: 'ThievingAction',
                succesful: true
            }
        ]
    },
    {
        summonIDs: ['melvorF:Cyclops', 'mythMusic:Bard'],
        modifiers: {
            increasedSlayerCoins: 10
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Yak', 'mythMusic:Bard'],
        modifiers: {
            increasedDamageReduction: 1
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            },
            {
                type: 'ThievingAction',
                succesful: false
            }
        ]
    },
    {
        summonIDs: ['melvorF:Unicorn', 'mythMusic:Bard'],
        modifiers: {
            increasedHitpointRegeneration: 50
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Dragon', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceToApplyBurn: 10
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Monkey', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceToDoubleItemsSkill: [
                {
                    skillID: 'melvorD:Crafting',
                    value: 10
                }
            ]
        },
        consumesOn: [
            {
                type: 'CraftingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Salamander', 'mythMusic:Bard'],
        modifiers: {
            increasedSkillPreservationChance: [
                {
                    skillID: 'melvorD:Smithing',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'SmithingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Bear', 'mythMusic:Bard'],
        modifiers: {
            increasedSkillPreservationChance: [
                {
                    skillID: 'melvorD:Herblore',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'HerbloreAction'
            }
        ]
    },
    {
        summonIDs: ['melvorF:Devil', 'mythMusic:Bard'],
        modifiers: {
            decreasedSkillIntervalPercent: [
                {
                    skillID: 'melvorD:Firemaking',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'FiremakingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Eagle', 'mythMusic:Bard'],
        modifiers: {
            decreasedSkillIntervalPercent: [
                {
                    skillID: 'melvorD:Agility',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'AgilityAction'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Owl', 'mythMusic:Bard'],
        modifiers: {
            decreasedSkillIntervalPercent: [
                {
                    skillID: 'melvorD:Astrology',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'AstrologyAction'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Beaver', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceToDoubleItemsSkill: [
                {
                    skillID: 'melvorD:Fletching',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'FletchingAction'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Fox', 'mythMusic:Bard'],
        modifiers: {
            increasedSummoningMaxHit: 5,
            decreasedSkillIntervalPercent: [
                {
                    skillID: 'melvorD:Summoning',
                    value: 5
                }
            ]
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            },
            {
                type: 'SummoningAction'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:LightningSpirit', 'mythMusic:Bard'],
        modifiers: {
            increasedGlobalStunChance: 5
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Siren', 'mythMusic:Bard'],
        modifiers: {
            increasedGlobalSleepChance: 5
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Spider', 'mythMusic:Bard'],
        modifiers: {
            increasedChanceToApplyPoison: 5,
            increased15SlowStunChance2Turns: 5
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    },
    {
        summonIDs: ['melvorTotH:Spectre', 'mythMusic:Bard'],
        modifiers: {
            decreasedEnemyDamageReduction: 5
        },
        consumesOn: [
            {
                type: 'PlayerSummonAttack'
            }
        ]
    }
];
