import { EquipmentComponent } from '../equipment/equipment';
import { Music } from '../music';
import { BardModifier, HiredBard } from '../music.types';

import './bard.scss';

export function BardComponent(music: Music) {
    let hiredBard: HiredBard = undefined;

    return {
        $template: '#myth-music-bard',
        get media() {
            return hiredBard?.instrument?.media;
        },
        get name() {
            return hiredBard?.instrument?.name;
        },
        get hasBard() {
            return hiredBard !== undefined;
        },
        get isUpgraded() {
            return hiredBard?.isUpgraded ?? false;
        },
        get socket() {
            return hiredBard?.socket !== undefined;
        },
        get utility() {
            return hiredBard?.utility !== undefined;
        },
        isEnabled: false,
        modifiers: [] as BardModifier[],
        currentMasteryLevel: 1,
        essenceIcon: function () {
            return music.manager.essenceOfMusicIcon;
        },
        setBard: function (bard: HiredBard) {
            hiredBard = bard;
            this.updateCurrentMasteryLevel();
        },
        updateCurrentMasteryLevel: function () {
            if (hiredBard) {
                const instrument = hiredBard.instrument;
                const instrumentRef = music.actions.allObjects.find(action => action.id === instrument.id);

                this.currentMasteryLevel = music.getMasteryLevel(instrumentRef);
            }
        },
        updateEnabled: function (enabled: boolean) {
            this.isEnabled = enabled;
        },
        updateModifiers: function () {
            this.modifiers = [];

            if (hiredBard) {
                this.modifiers = music.manager.getModifiers(hiredBard.instrument);
            }
        },
        equipment: function () {
            const bard = hiredBard;

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
