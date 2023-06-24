import { EquipmentComponent } from '../equipment/equipment';
import { Music } from '../music';
import { BardModifier, HiredBard, Instrument } from '../music.types';

import './bard.scss';

export function BardComponent(music: Music, game: Game) {
    return {
        $template: '#myth-music-bard',
        bard: undefined as HiredBard,
        isEnabled: false,
        modifiers: [] as BardModifier[],
        essenceIcon: function () {
            return music.manager.essenceOfMusicIcon;
        },
        setBard: function (bard: HiredBard) {
            this.bard = bard;
        },
        updateEnabled: function (enabled: boolean) {
            this.isEnabled = enabled;
        },
        updateModifiers: function () {
            this.modifiers = [];

            if (this.bard) {
                this.modifiers = music.manager.getModifiers(this.bard.instrument);
            }
        },
        equipment: function () {
            const bard = this.bard;

            SwalLocale.fire({
                html: '<div id="myth-music-equipment-container"></div>',
                showConfirmButton: false,
                showCancelButton: false,
                showDenyButton: false,
                didOpen: popup => {
                    ui.create(
                        EquipmentComponent(music, game, bard),
                        popup.querySelector('#myth-music-equipment-container')
                    );
                }
            });
        }
    };
}
