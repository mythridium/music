import { BardComponent } from './bard/bard';
import { InstrumentComponent } from './instrument/instrument';
import { LockedComponent } from './locked/locked';
import { Music } from './music';
import { Instrument } from './music.types';

export class UserInterface {
    public readonly instruments = new Map<Instrument, ReturnType<typeof InstrumentComponent>>();
    public locked: ReturnType<typeof LockedComponent>;
    public bard1: ReturnType<typeof BardComponent>;
    public bard2: ReturnType<typeof BardComponent>;
    public bard3: ReturnType<typeof BardComponent>;

    public get mainContainer() {
        return document.getElementById('main-container');
    }

    public get instrumentsContainer() {
        return document.getElementById('instruments-container');
    }

    public get bardContainer() {
        return document.getElementById('bard-container');
    }

    constructor(
        private readonly context: Modding.ModContext,
        private readonly game: Game,
        private readonly music: Music
    ) {}

    public init() {
        this.context.onInterfaceAvailable(async () => {
            this.mainContainer.append(...this.music.manager.elements);

            this.modifySkillInfoClass(this.mainContainer);

            for (const instrument of this.music.sortedMasteryActions) {
                const component = InstrumentComponent(this.music, instrument, this.game);

                ui.create(component, this.instrumentsContainer);

                this.instruments.set(instrument, component);
            }

            this.locked = LockedComponent(this.music);
            ui.create(this.locked, this.instrumentsContainer);

            this.bard1 = BardComponent(this.music);
            this.bard2 = BardComponent(this.music);
            this.bard3 = BardComponent(this.music);

            ui.create(this.bard1, this.bardContainer);
            ui.create(this.bard2, this.bardContainer);
            ui.create(this.bard3, this.bardContainer);
        });

        this.context.patch(NotificationQueue, 'notify').replace(patch => {
            const concertPassId = 'mythMusic:Concert_Pass';

            const notifications = this.game.combat.notifications.queue
                .map((notification, index) => ({ notification, index }))
                .filter(
                    ({ notification }) =>
                        notification.type === 'ItemCharges' && notification.args[0]?.id === concertPassId
                )
                .sort((a, b) => b.index - a.index);

            for (const { index } of notifications) {
                const item = this.game.items.getObjectByID(concertPassId);

                if (item) {
                    imageNotify(item.media, 'Your Concert Pass has run out!', 'danger');
                    this.game.combat.notifications.queue.splice(index, 1);
                }
            }

            return patch();
        });

        // Fix completion log bug that doesn't set current level for modded skills.
        this.context.patch(Completion, 'updateSkillProgress').after(() => {
            this.game.completion.skillProgress.currentCount.add(this.music.namespace, Math.max(this.music.level, 0));
        });
    }

    private modifySkillInfoClass(mainContainer: HTMLElement) {
        // The isMobile function is bugged as it doesn't actually call isAndroid???
        const isMobile = isIOS() || isAndroid() || location.pathname.includes('index_mobile.php');

        if (!isMobile) {
            return;
        }

        const skillInfo = mainContainer.querySelector('#music-container .music-skill-info');

        if (!skillInfo) {
            return;
        }

        skillInfo.classList.remove('skill-info');
        skillInfo.classList.add('skill-info-mobile');
    }
}
