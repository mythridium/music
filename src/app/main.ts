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
    interface Game {
        constructEventMatcher(data: GameEventMatcherData | MusicActionEventMatcherOptions): GameEventMatcher;
    }

    interface CloudManager {
        hasTotHEntitlement: boolean;
        hasAoDEntitlement: boolean;
    }

    const cloudManager: CloudManager;

    interface SkillIDDataMap {
        'mythMusic:Music': MusicSkillData;
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

        const music = this.game.registerSkill(this.game.registeredNamespaces.getNamespace('mythMusic'), Music);

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

        if (cloudManager.hasTotHEntitlement && cloudManager.hasAoDEntitlement) {
            await this.context.gameData.addPackage('data-aod-toth.json');
        }

        this.patchMusicTalismans();
        this.patchUnlock(music);
        this.initCompatibility(music);
        this.initAgility(music);
        this.initAstrology(music);
        this.initTownship();

        music.userInterface = this.initInterface(music);
        music.initSettings(settings);
    }

    private patchEventManager() {
        this.context.patch(GameEventSystem, 'constructMatcher').after((_patch, data) => {
            if (this.isMusicEvent(data)) {
                return new MusicActionEventMatcher(data, this.game);
            }
        });
    }

    private patchUnlock(music: Music) {
        this.context.patch(EventManager, 'loadEvents').after(() => {
            if (this.game.currentGamemode.id === 'melvorAoD:AncientRelics') {
                music.setUnlock(true);
            }
        });
    }

    private patchMusicTalismans() {
        this.context.patch(Bank, 'claimItemOnClick').after((patch, item) => {
            if (this.game.currentGamemode.id === 'melvorAoD:AncientRelics') {
                if (item.id === 'mythMusic:Ancient_Coin_Token' || item.id === 'mythMusic:Ancient_Mask_Token') {
                    awardRandomSkillLevelCapIncreaseForPre99(5);
                }

                if (item.id === 'mythMusic:Ancient_Skull_Token') {
                    awardRandomSkillLevelCapIncreaseForPost99(6);
                }
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
