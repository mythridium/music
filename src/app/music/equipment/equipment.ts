import { Music } from '../music';
import { HiredBard } from '../music.types';
import { UpgradeType } from './upgrades';

import './equipment.scss';

enum State {
    Manage = 'manage',
    Upgrade = 'upgrade',
    Socket = 'socket',
    Utility = 'utility'
}

export function EquipmentComponent(music: Music, game: Game, bard: HiredBard) {
    return {
        $template: '#myth-music-equipment',
        bard,
        state: State.Manage,
        items: music.upgrades.data(),
        get upgradeModifier() {
            return music.manager.getModifiers(bard.instrument).filter(modifier => modifier.isUpgrade)[0];
        },
        ok: function () {
            SwalLocale.clickConfirm();
        },
        setState: function (state: State) {
            music.upgrades.calculate();
            this.items = music.upgrades.data();
            this.state = state;
        },
        upgrade: function () {
            music.upgrades.removeQuantity(UpgradeType.EssenceOfMusic);

            bard.isUpgraded = true;
            music.bards.set(bard.instrument, bard);

            this.completeUpgrade();
        },
        socket: function (type: UpgradeType) {
            music.upgrades.removeQuantity(type);

            const upgrade = music.upgrades.get(type);

            bard.socket = upgrade.item;
            music.bards.set(bard.instrument, bard);

            this.completeUpgrade();
        },
        utility: function (type: UpgradeType) {
            music.upgrades.removeQuantity(type);

            const upgrade = music.upgrades.get(type);

            bard.utility = upgrade.item;
            music.bards.set(bard.instrument, bard);

            this.completeUpgrade();
        },
        completeUpgrade() {
            music.computeProvidedStats(true);
            music.renderQueue.bardModifiers = true;
            music.renderQueue.gpRange = true;
            music.renderQueue.grants = true;

            this.items = music.upgrades.data();
            this.state = State.Manage;
        },
        isSocket(type: UpgradeType) {
            const upgrade = music.upgrades.get(type);

            return bard.socket?.id === upgrade.item.id;
        },
        isUtility(type: UpgradeType) {
            const upgrade = music.upgrades.get(type);

            return bard.utility?.id === upgrade.item.id;
        },
        getModifier(item: UpgradeType) {
            const upgrade = music.upgrades.get(item);

            return upgrade.descriptions;
        }
    };
}
