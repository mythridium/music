export interface BardModifier {
    description: string;
    isActive: boolean;
    isUpgrade: boolean;
    level: number;
}

export type InstrumentModifier = InstrumentSkillModifier | InstrumentStandardModifier;

export interface InstrumentSkillModifier {
    level: number;
    key: SkillModifierKeys;
    value: number;
    skill: string | AnySkill;
}

export interface InstrumentStandardModifier {
    level: number;
    key: StandardModifierKeys;
    value: number;
}

export interface MusicSkillData extends MasterySkillData {
    instruments: InstrumentData[];
}

export interface InstrumentData extends BasicSkillRecipeData {
    name: string;
    media: string;
    baseInterval: number;
    maxGP: number;
    modifiers: InstrumentModifier[];
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
    modifiers: InstrumentModifier[];
    skills: string[];

    public get name() {
        return this.data.name;
    }

    public get media() {
        return this.getMediaURL(this.data.media);
    }

    constructor(namespace: DataNamespace, private readonly data: InstrumentData) {
        super(namespace, data);

        this.baseInterval = data.baseInterval;
        this.maxGP = data.maxGP;
        this.modifiers = data.modifiers;
        this.skills = data.skills;
    }
}
