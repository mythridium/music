import { BardComponent } from './bard/bard';
import { InstrumentComponent } from './instrument/instrument';
import { Instrument, Music } from './music';

export class UserInterface {
    public readonly instruments = new Map<Instrument, ReturnType<typeof InstrumentComponent>>();
    public bard1: ReturnType<typeof BardComponent>;
    public bard2: ReturnType<typeof BardComponent>;

    public get mainContainer() {
        return document.getElementById('main-container');
    }

    public get instrumentsContainer() {
        return document.getElementById('instruments-container');
    }

    public get bardContainer() {
        return document.getElementById('bard-container');
    }

    constructor(private readonly context: Modding.ModContext, private readonly music: Music) {}

    public init() {
        this.context.onInterfaceAvailable(async () => {
            this.mainContainer.append(...this.music.manager.elements);

            this.modifySkillInfoClass(this.mainContainer);

            for (const instrument of this.music.actions.registeredObjects.values()) {
                const component = InstrumentComponent(this.music, instrument, game);

                ui.create(component, this.instrumentsContainer);

                this.instruments.set(instrument, component);
            }

            this.bard1 = BardComponent(this.music, game);
            this.bard2 = BardComponent(this.music, game);

            ui.create(this.bard1, this.bardContainer);
            ui.create(this.bard2, this.bardContainer);
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
