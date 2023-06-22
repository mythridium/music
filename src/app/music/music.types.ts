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
