import { MusicActionEventMatcher, MusicActionEventMatcherOptions } from './music/event';
import { Music } from './music/music';
import { UserInterface } from './music/user-interface';
import { MythModifiers } from './music/modifiers';
import { MythTownship } from './township/township';
import { MythAgility } from './agility/agility';
import { MythAstrology } from './astrology/astrology';
import { TinyPassiveIconsCompatibility } from './compatibility/tiny-passive-icons';
import { MusicSkillData } from './music/music.types';
import { languages } from './language';
import { MythTranslation } from './translation/translation';
import { MusicSettings } from './music/settings';

declare global {
    interface CloudManager {
        hasTotHEntitlement: boolean;
        hasAoDEntitlement: boolean;
    }

    const cloudManager: CloudManager;

    interface SkillIDDataMap {
        'mythMusic:Music': MusicSkillData;
    }

    interface SkillValue {
        skill: AnySkill;
        value: number;
    }

    interface Game {
        music: Music;
    }

    interface Gamemode {
        /** The number of skill cap increase choices obtained per dungeon completion before Level 99 if allowDungeonLevelCapIncrease = true */
        skillCapIncreasesPre99: number;
        /** The number of skill cap increase choices obtained per dungeon completion after Level 99 if allowDungeonLevelCapIncrease = true */
        skillCapIncreasesPost99: number;
        /** Skills that auto level per dungeon completion before Level 99 if allowDungeonLevelCapIncrease = true */
        autoLevelSkillsPre99: SkillValue[];
        /** Skills that auto level per dungeon completion after Level 99 if allowDungeonLevelCapIncrease = true */
        autoLevelSkillsPost99: SkillValue[];
        /** Skills that are part of the cap increase pool before Level 99 obtained per dungeon completion if allowDungeonLevelCapIncrease = true */
        skillCapRollsPre99: SkillValue[];
        /** Skills that are part of the cap increase pool after Level 99 obtained per dungeon completion if allowDungeonLevelCapIncrease = true */
        skillCapRollsPost99: SkillValue[];
    }
}

export class App {
    constructor(private readonly context: Modding.ModContext, private readonly game: Game) {}

    public async init() {
        await this.context.loadTemplates('music/music.html');
        await this.context.loadTemplates('music/instrument/instrument.html');
        await this.context.loadTemplates('music/bard/bard.html');
        await this.context.loadTemplates('music/equipment/equipment.html');
        await this.context.loadTemplates('music/mastery/mastery.html');
        await this.context.loadTemplates('music/locked/locked.html');

        this.initLanguage();
        this.initTranslation();
        const settings = this.initSettings();
        this.patchEventManager();
        this.initModifiers();

        this.game.music = this.game.registerSkill(this.game.registeredNamespaces.getNamespace('mythMusic'), Music);

        await this.context.gameData.addPackage('data.json');

        if (cloudManager.hasTotHEntitlement) {
            await this.context.gameData.addPackage('data-toth.json');

            await this.context.gameData
                .buildPackage(builder => {
                    builder.skillData.add({
                        skillID: 'mythMusic:Music',
                        data: {
                            minibar: {
                                defaultItems: ['mythMusic:Superior_Music_Skillcape'],
                                upgrades: [],
                                pets: []
                            },
                            instruments: []
                        }
                    });
                })
                .add();
        }

        if (cloudManager.hasAoDEntitlement) {
            await this.context.gameData.addPackage('data-aod.json');
        }

        this.patchGamemodes(this.game.music);
        this.patchUnlock(this.game.music);
        this.initCompatibility(this.game.music);
        this.initAgility(this.game.music);
        this.initAstrology(this.game.music);
        this.initTownship();

        this.game.music.userInterface = this.initInterface(this.game.music);
        this.game.music.initSettings(settings);
    }

    private patchEventManager() {
        this.context.patch(GameEventSystem, 'constructMatcher').after((_patch, data) => {
            if (this.isMusicEvent(data)) {
                return new MusicActionEventMatcher(data, this.game) as any;
            }
        });
    }

    private patchGamemodes(music: Music) {
        this.game.gamemodes.forEach(gamemode => {
            if (gamemode.allowDungeonLevelCapIncrease) {
                if (!gamemode.startingSkills) {
                    gamemode.startingSkills = new Set();
                }

                if (!gamemode.autoLevelSkillsPre99) {
                    gamemode.autoLevelSkillsPre99 = [];
                }

                if (!gamemode.autoLevelSkillsPost99) {
                    gamemode.autoLevelSkillsPost99 = [];
                }

                gamemode.startingSkills.add(music);
                gamemode.autoLevelSkillsPre99.push({ skill: music, value: 5 });
                gamemode.autoLevelSkillsPost99.push({ skill: music, value: 3 });
            }
        });
    }

    private patchUnlock(music: Music) {
        this.context.patch(EventManager, 'loadEvents').after(() => {
            if (this.game.currentGamemode.allowDungeonLevelCapIncrease) {
                music.setUnlock(true);
                music.increasedLevelCap = this.game.attack.increasedLevelCap;
            }
        });
    }

    private isMusicEvent(
        data: GameEventMatcherData | MusicActionEventMatcherOptions
    ): data is MusicActionEventMatcherOptions {
        return data.type === 'MusicAction';
    }

    private initSettings() {
        const settings = new MusicSettings(this.context);

        settings.init();

        return settings;
    }

    private initModifiers() {
        const modifiers = new MythModifiers();

        modifiers.registerModifiers();
    }

    private initTownship() {
        const township = new MythTownship(this.context, this.game);

        township.register();
    }

    private initAgility(music: Music) {
        const agility = new MythAgility(this.game, music);

        agility.register();
    }

    private initAstrology(music: Music) {
        const astrology = new MythAstrology(this.game, music);

        astrology.register();
    }

    private initCompatibility(music: Music) {
        const tinyPassiveIcons = new TinyPassiveIconsCompatibility(this.context, music);

        tinyPassiveIcons.patch();
    }

    private initInterface(music: Music) {
        const userInterface = new UserInterface(this.context, this.game, music);

        userInterface.init();

        return userInterface;
    }

    private initTranslation() {
        const translation = new MythTranslation(this.context);

        translation.init();
    }

    private initLanguage() {
        let lang = setLang;

        if (lang === 'lemon' || lang === 'carrot') {
            lang = 'en';
        }

        const keysToNotPrefix = [
            'MASTERY_CHECKPOINT',
            'MASTERY_BONUS',
            'POTION_NAME',
            'PET_NAME',
            'ITEM_NAME',
            'ITEM_DESCRIPTION',
            'SHOP_NAME',
            'SHOP_DESCRIPTION',
            'MONSTER_NAME',
            'COMBAT_AREA_NAME',
            'SPECIAL_ATTACK_NAME',
            'SPECIAL_ATTACK_DESCRIPTION'
        ];

        for (const [key, value] of Object.entries<string>(languages[lang])) {
            if (keysToNotPrefix.some(prefix => key.includes(prefix))) {
                loadedLangJson[key] = value;
            } else {
                loadedLangJson[`Myth_Music_${key}`] = value;
            }
        }
    }
}
