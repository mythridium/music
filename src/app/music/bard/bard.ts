import { EquipmentComponent } from '../equipment/equipment';
import { Music } from '../music';
import { BardModifier, HiredBard } from '../music.types';

import './bard.scss';

export interface BardContext {
    media: string;
    name: string;
    isUpgraded: boolean;
    socketId: string;
    utilityId: string;
    instrumentId: string;
}

export function BardComponent(music: Music) {
    let hiredBard: HiredBard = undefined;

    return {
        $template: '#myth-music-bard',
        bard: undefined as BardContext,
        get media() {
            return this.bard?.media;
        },
        get name() {
            return this.bard?.name;
        },
        get hasBard() {
            return this.bard !== undefined;
        },
        get isUpgraded() {
            return this.bard?.isUpgraded ?? false;
        },
        get socket() {
            return this.bard?.socketId !== undefined;
        },
        get utility() {
            return this.bard?.utilityId !== undefined;
        },
        isEnabled: false,
        modifiers: [] as BardModifier[],
        currentMasteryLevel: 1,
        essenceIcon: function () {
            return music.manager.essenceOfMusicIcon;
        },
        setBard: function (bard: HiredBard) {
            hiredBard = bard;

            if (!bard) {
                this.bard = undefined;
            } else {
                this.bard = {
                    instrumentId: bard.instrument?.id,
                    media: bard.instrument?.media,
                    name: bard.instrument?.name,
                    isUpgraded: bard.isUpgraded,
                    socketId: bard.socket?.id,
                    utilityId: bard.utility?.id
                };
            }
            this.updateCurrentMasteryLevel();
        },
        updateCurrentMasteryLevel: function () {
            if (this.bard) {
                const instrumentRef = music.actions.allObjects.find(action => action.id === this.bard.instrumentId);

                this.currentMasteryLevel = music.getMasteryLevel(instrumentRef);
            }
        },
        updateEnabled: function (enabled: boolean) {
            this.isEnabled = enabled;
        },
        updateModifiers: function () {
            this.modifiers = [];

            if (this.bard) {
                const instrumentRef = music.actions.allObjects.find(action => action.id === this.bard.instrumentId);

                this.modifiers = music.manager.getModifiers(instrumentRef);
            }
        },
        equipment: function () {
            SwalLocale.fire({
                html: '<div id="myth-music-equipment-container"></div>',
                showConfirmButton: false,
                showCancelButton: false,
                showDenyButton: false,
                didOpen: popup => {
                    ui.create(
                        EquipmentComponent(music, hiredBard, this.setBard),
                        popup.querySelector('#myth-music-equipment-container')
                    );
                }
            });
        }
    };
}
