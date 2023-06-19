import { BardComponent } from './bard/bard';
import { Herblore } from './herblore/herblore';
import { InstrumentComponent } from './instrument/instrument';
import { MusicActionEventMatcher } from './music/event';
import { Modifiers } from './music/modifiers';
import { Music } from './music/music';
import { Summoning } from './summoning/summoning';
import { Township } from './township/township';

export class App {
    constructor(private readonly context: Modding.ModContext) {}

    public async init() {
        await this.context.loadTemplates('music/music.html');
        await this.context.loadTemplates('instrument/instrument.html');
        await this.context.loadTemplates('bard/bard.html');

        const modifiers = new Modifiers();

        modifiers.registerModifiers();

        const music = game.registerSkill(game.registeredNamespaces.getNamespace('mythMusic'), Music);

        await this.context.gameData.addPackage('data.json');

        this.initSummoning();
        this.initHerblore();
        this.initTownship();

        this.context.onInterfaceAvailable(async () => {
            const mainContainer = document.getElementById('main-container');
            mainContainer.append(...music.elements());

            const instrumentContainer = document.getElementById('instruments-container');

            music.actions.forEach(instrument => {
                const component = InstrumentComponent(music, instrument, game);
                ui.create(component, instrumentContainer);
                music.instruments.set(instrument, component);
            });

            const bardContainer = document.getElementById('bard-container');
            const component = BardComponent(music, game);
            ui.create(component, bardContainer);
            music.bardComponent = component;
        });
    }

    private initSummoning() {
        const summoning = new Summoning(this.context);

        summoning.register();
        this.attachEventMatcher(summoning.eventItemIds);
    }

    private initHerblore() {
        const herblore = new Herblore(this.context);

        herblore.registerPotion();
        this.attachEventMatcher(herblore.eventItemIds);
    }

    private initTownship() {
        const township = new Township(this.context);

        township.registerTraderItems();
        this.attachEventMatcher(township.eventItemIds);
    }

    private attachEventMatcher(itemIds: string[]) {
        for (const itemId of itemIds) {
            const item = game.items.getObjectByID(itemId) as EquipmentItem | PotionItem;

            if (item) {
                item.consumesOn = item.consumesOn?.map(consume => {
                    if (consume) {
                        return consume;
                    }

                    return new MusicActionEventMatcher({ type: 'MusicAction' }, game);
                });
            }
        }
    }
}
