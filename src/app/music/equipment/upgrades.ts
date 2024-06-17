import { Music } from '../music';

export enum UpgradeType {
    EssenceOfMusic = 'Essence_Of_Music',
    PolishedTopazGem = 'Polished_Topaz_Gem',
    PolishedRubyGem = 'Polished_Ruby_Gem',
    PolishedSapphireGem = 'Polished_Sapphire_Gem',
    DiamondString = 'Diamond_String',
    PristineLeather = 'Pristine_Leather',
    MysticOil = 'Mystic_Oil'
}

export interface Upgrade {
    itemId: UpgradeType;
    item: Item;
    quantity: number;
    modifiers: StatObject[];
    descriptions: string[];
}

export class Upgrades {
    private readonly upgrades = new Map<UpgradeType, Upgrade>();

    constructor(private readonly music: Music, private readonly game: Game) {
        this.calculate();
    }

    public calculate() {
        for (const type of Object.values(UpgradeType)) {
            const item = this.game.items.getObjectByID(`mythMusic:${type}`);
            const modifiers = this.music.upgradeModifiers.find(
                modifier => modifier.itemId === `mythMusic:${type}`
            ).modifiers;

            this.upgrades.set(type, {
                itemId: type,
                item,
                quantity: this.game.bank.getQty(item),
                modifiers,
                // @ts-ignore // TODO: TYPES
                descriptions: [modifiers.describePlain()]
            });
        }
    }

    public data() {
        return Object.fromEntries(this.upgrades.entries());
    }

    public get(type: UpgradeType) {
        return this.upgrades.get(type);
    }

    public removeQuantity(type: UpgradeType, amount = 1) {
        const upgrade = this.upgrades.get(type);

        upgrade.quantity -= amount;
        this.game.bank.removeItemQuantityByID(upgrade.item.id, amount, true);
    }
}
