import { EquipmentComponent } from '../equipment/equipment';
import { Music } from '../music';
import { BardModifier, HiredBard } from '../music.types';

import './bard.scss';

export function BardComponent(music: Music) {
    return {
        $template: '#myth-music-bard',
        bard: undefined as HiredBard,
        isEnabled: false,
        modifiers: [] as BardModifier[],
        currentMasteryLevel: 1,
        essenceIcon: function () {
            return music.manager.essenceOfMusicIcon;
        },
        setBard: function (bard: HiredBard) {
            this.bard = bard;
            this.updateCurrentMasteryLevel();
        },
        updateCurrentMasteryLevel: function () {
            if (this.bard) {
                const instrument = this.bard.instrument;
                const instrumentRef = music.actions.allObjects.find(action => action.id === instrument.id);

                this.currentMasteryLevel = music.getMasteryLevel(instrumentRef);
            }
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
                    ui.create(EquipmentComponent(music, bard), popup.querySelector('#myth-music-equipment-container'));
                }
            });
        }
    };
}
