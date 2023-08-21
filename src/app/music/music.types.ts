import { ModifierType } from './settings';

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

    private standardModifiers: InstrumentModifier[];
    private hardcoreModifiers: InstrumentModifier[];

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

    constructor(namespace: DataNamespace, private readonly data: InstrumentData) {
        super(namespace, data);

        this.baseInterval = data.baseInterval;
        this.maxGP = data.maxGP;
        this.standardModifiers = data.standardModifiers;
        this.hardcoreModifiers = data.hardcoreModifiers;
        this.skills = data.skills;
    }
}
