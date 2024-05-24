import { ModifierType } from './settings';

export interface BardModifier {
    description: string;
    isActive: boolean;
    isUpgrade: boolean;
    level: number;
}

export interface InstrumentModifier {
    level: number;
    modifiers?: {};
    enemyModifiers?: {};
    conditionalModifiers?: [];
    combatEffects?: [];
}

export interface MusicSkillData extends MasterySkillData {
    instruments: InstrumentData[];
    upgrades: UpgradeData[];
}

export interface InstrumentData extends BasicSkillRecipeData {
    name: string;
    media: string;
    baseInterval: number;
    maxGP: number;
    standardModifiers: InstrumentModifier[];
    hardcoreModifiers: InstrumentModifier[];
    skills: string[];
}

export interface HiredBard {
    instrument: Instrument;
    slot: number;
    isUpgraded: boolean;
    socket: Item;
    utility: Item;
}

export class Instrument extends BasicSkillRecipe {
    baseInterval: number;
    maxGP: number;
    skills: string[];

    // @ts-ignore // TODO: TYPES
    private standardModifiers: StatObject[];
    // @ts-ignore // TODO: TYPES
    private hardcoreModifiers: StatObject[];

    public get name() {
        return getLangString(`Myth_Music_Instrument_${this.localID}`);
    }

    public get media() {
        return this.getMediaURL(this.data.media);
    }

    public modifiers(type: ModifierType) {
        switch (type) {
            case ModifierType.Standard:
                return this.standardModifiers;
            case ModifierType.Hardcore:
                return this.hardcoreModifiers;
        }
    }

    constructor(namespace: DataNamespace, private readonly data: InstrumentData, game: Game) {
        // @ts-ignore // TODO: TYPES
        super(namespace, data, game);

        this.baseInterval = data.baseInterval;
        this.maxGP = data.maxGP;
        this.standardModifiers = data.standardModifiers.map(modifier => {
            // @ts-ignore // TODO: TYPES
            const stats = new StatObject(modifier, game, `${Instrument.name}`);
            stats.level = modifier.level;
            return stats;
        });
        this.hardcoreModifiers = data.hardcoreModifiers.map(modifier => {
            // @ts-ignore // TODO: TYPES
            const stats = new StatObject(modifier, game, `${Instrument.name}`);
            stats.level = modifier.level;
            return stats;
        });
        this.skills = data.skills;
    }
}

export interface UpgradeData {
    itemId: string;
    modifiers: InstrumentModifier[];
}

export class UpgradeModifier {
    itemId: string;
    // @ts-ignore // TODO: TYPES
    modifiers: StatObject[];

    constructor(private readonly data: UpgradeData, private readonly game: Game) {
        this.itemId = this.data.itemId;
        // @ts-ignore // TODO: TYPES
        this.modifiers = new StatObject(this.data, this.game, `${UpgradeModifier.name} with id ${this.itemId}`);

        // @ts-ignore // TODO: TYPES
        this.modifiers.registerSoftDependencies(this.data, this.game);
    }
}
