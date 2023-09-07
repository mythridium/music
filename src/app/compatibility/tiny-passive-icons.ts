import { Music } from '../music/music';

export class TinyPassiveIconsCompatibility {
    constructor(private readonly context: Modding.ModContext, private readonly music: Music) {}

    public patch() {
        this.context.onModsLoaded(() => {
            if (!this.isLoaded()) {
                return;
            }

            if ('cdnMedia' in window) {
                const that = this;

                window.cdnMedia = function cdnMedia(media) {
                    if (media.includes('music.svg')) {
                        return that.music.media;
                    }

                    if (useCDN) {
                        const cdnDir = CDNDIR();
                        return `${cdnDir}${media}`;
                    } else {
                        return media;
                    }
                };
            }
        });
    }

    private isLoaded() {
        return mod.manager.isEnabled() && mod.manager.getLoadedModList().includes('Tiny Passive Icons');
    }
}
