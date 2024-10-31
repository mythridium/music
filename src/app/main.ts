import { MusicActionEventMatcher, MusicActionEventMatcherOptions } from './music/event';
import { Music } from './music/music';
import { UserInterface } from './music/user-interface';
import { MythTownship } from './township/township';
import { TinyPassiveIconsCompatibility } from './compatibility/tiny-passive-icons';
import { MusicSkillData } from './music/music.types';
import { languages } from './language';
import { MythTranslation } from './translation/translation';
import { MusicSettings } from './music/settings';

declare global {
    interface CloudManager {
        hasTotHEntitlementAndIsEnabled: boolean;
        hasAoDEntitlementAndIsEnabled: boolean;
        hasItAEntitlementAndIsEnabled: boolean;
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
        mod.api.mythCombatSimulator?.registerNamespace('mythMusic', {
            name: 'Music',
            icon: 'assets/instruments/guitar.png',
            header: { title: 'Music', description: 'Modify your configuration for the music skill.' }
        });

        await this.context.loadTemplates('app/music/music.html');
        await this.context.loadTemplates('app/music/instrument/instrument.html');
        await this.context.loadTemplates('app/music/bard/bard.html');
        await this.context.loadTemplates('app/music/equipment/equipment.html');
        await this.context.loadTemplates('app/music/mastery/mastery.html');
        await this.context.loadTemplates('app/music/locked/locked.html');

        this.initLanguage();
        this.initTranslation();
        const settings = this.initSettings();
        this.patchEventManager();

        this.game.music = this.game.registerSkill(this.game.registeredNamespaces.getNamespace('mythMusic'), Music);

        await this.context.gameData.addPackage('data/data.json');

        if (cloudManager.hasTotHEntitlementAndIsEnabled) {
            await this.context.gameData.addPackage('data/data-toth.json');

            await this.context.gameData
                .buildPackage(builder => {
                    builder.skillData.add({
                        // @ts-ignore
                        skillID: 'mythMusic:Music',
                        data: {
                            minibar: {
                                defaultItems: ['mythMusic:Superior_Music_Skillcape'],
                                upgrades: [],
                                pets: []
                            },
                            // @ts-ignore
                            instruments: [],
                            upgrades: []
                        }
                    });
                })
                .add();
        }

        if (cloudManager.hasAoDEntitlementAndIsEnabled) {
            await this.context.gameData.addPackage('data/data-aod.json');
        }

        this.context.onModsLoaded(async () => {
            await this.initGamemodes();
            this.patchUnlock(this.game.music);
            this.initCompatibility(this.game.music);
            this.initTownship();
        });

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

    private patchUnlock(music: Music) {
        this.context.patch(EventManager, 'loadEvents').after(() => {
            if (this.game.currentGamemode.startingSkills?.has(music)) {
                music.setUnlock(true);
            }
        });
    }

    private isMusicEvent(
        data: GameEventMatcherData | MusicActionEventMatcherOptions
    ): data is MusicActionEventMatcherOptions {
        return data.type === 'MusicAction';
    }

    private async initGamemodes() {
        if (cloudManager.hasAoDEntitlementAndIsEnabled) {
            const levelCapIncreases = ['mythMusic:Pre99Dungeons', 'mythMusic:ImpendingDarknessSet100'];

            if (cloudManager.hasTotHEntitlementAndIsEnabled) {
                levelCapIncreases.push(...['mythMusic:Post99Dungeons', 'mythMusic:ThroneOfTheHeraldSet120']);
            }

            const gamemodes = this.game.gamemodes.filter(
                gamemode =>
                    gamemode.defaultInitialLevelCap !== undefined &&
                    gamemode.levelCapIncreases?.length &&
                    gamemode.useDefaultSkillUnlockRequirements === true &&
                    gamemode.allowSkillUnlock === false
            );

            await this.context.gameData.addPackage({
                $schema: '',
                namespace: 'mythMusic:Music',
                modifications: {
                    gamemodes: gamemodes.map(gamemode => ({
                        id: gamemode.id,
                        levelCapIncreases: {
                            add: levelCapIncreases
                        },
                        startingSkills: {
                            add: ['mythMusic:Music']
                        },
                        skillUnlockRequirements: [
                            {
                                skillID: 'mythMusic:Music',
                                requirements: [
                                    {
                                        type: 'SkillLevel',
                                        skillID: 'melvorD:Attack',
                                        level: 1
                                    }
                                ]
                            }
                        ]
                    }))
                }
            });
        }
    }

    private initSettings() {
        const settings = new MusicSettings(this.context);

        settings.init();

        return settings;
    }

    private initTownship() {
        const township = new MythTownship(this.context, this.game);

        township.register();
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
