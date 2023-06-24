import { MusicActionEventMatcher, MusicActionEventMatcherOptions } from './music/event';
import { MythModifiers } from './music/modifiers';
import { Music } from './music/music';
import { MythTownship } from './township/township';
import { UserInterface } from './music/user-interface';

declare global {
    interface Game {
        constructEventMatcher(data: GameEventMatcherData | MusicActionEventMatcherOptions): GameEventMatcher;
    }
}

export class App {
    constructor(private readonly context: Modding.ModContext) {}

    public async init() {
        await this.context.loadTemplates('music/music.html');
        await this.context.loadTemplates('music/instrument/instrument.html');
        await this.context.loadTemplates('music/bard/bard.html');
        await this.context.loadTemplates('music/equipment/equipment.html');

        this.patchEventManager();
        this.initModifiers();

        const music = game.registerSkill(game.registeredNamespaces.getNamespace('mythMusic'), Music);

        await this.context.gameData.addPackage('data.json');

        this.initTownship();

        music.userInterface = this.initInterface(music);
    }

    private patchEventManager() {
        this.context.patch(Game, 'constructEventMatcher').after((_patch, data) => {
            if (this.isMusicEvent(data)) {
                return new MusicActionEventMatcher(data, game);
            }
        });
    }

    private isMusicEvent(
        data: GameEventMatcherData | MusicActionEventMatcherOptions
    ): data is MusicActionEventMatcherOptions {
        return data.type === 'MusicAction';
    }

    private initModifiers() {
        const modifiers = new MythModifiers();

        modifiers.registerModifiers();
    }

    private initTownship() {
        const township = new MythTownship(this.context);

        township.registerTraderItems();
    }

    private initInterface(music: Music) {
        const userInterface = new UserInterface(this.context, music);

        userInterface.init();

        return userInterface;
    }
}
