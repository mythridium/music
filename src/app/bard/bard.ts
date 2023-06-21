import { BardModifiers, Instrument, Music } from '../music/music';
import './bard.scss';

export function BardComponent(music: Music, game: Game) {
    return {
        $template: '#myth-music-bard',
        bard: {} as Instrument,
        isEnabled: false,
        isUpgraded: false,
        modifiers: [] as BardModifiers[],
        essenceIcon: function () {
            return music.essenceIcon;
        },
        setBard: function (instrument: Instrument, isUpgraded: boolean) {
            this.bard = instrument;
            this.isUpgraded = isUpgraded;
        },
        updateEnabled: function (enabled: boolean) {
            this.isEnabled = enabled;
        },
        updateModifiers: function () {
            this.modifiers = music.getBardModifiers(this.bard);
        },
        upgrade: function () {
            const upgradeItem = game.items.getObjectByID('mythMusic:Essence_Of_Music');
            const canAfford = game.bank.getQty(upgradeItem) > 0;

            if (!canAfford) {
                let html = `
                    <h5 class="font-w400 text-combat-smoke font-size-sm mb-2">You do not have enough materials to upgrade this bards instrument.</h5>
                    <h5 class="mt-2">
                        <span class="text-danger">1</span>
                        <img class="skill-icon-xs ml-2 mr-1" src="${upgradeItem.media}" />
                        <span class="text-danger">${upgradeItem.name}</span>
                    </h5>
                `;

                const modifiers = music.getHiddenModifierDescriptions(this.bard);

                for (const modifier of modifiers) {
                    html += `<div><small><span class="myth-text-grey">${modifier}</span></small></div>`;
                }

                SwalLocale.fire({
                    html,
                    showCancelButton: false,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
            } else {
                let html = `
                    <h5 class="font-w400 text-combat-smoke font-size-sm mb-2">Would you like to upgrade this bards instrument?</h5>
                    <h5 class="mt-2">
                        <span class="text-success">1</span>
                        <img class="skill-icon-xs ml-2 mr-1" src="${upgradeItem.media}" />
                        <span class="text-success">${upgradeItem.name}</span>
                    </h5>
                `;

                const modifiers = music.getHiddenModifierDescriptions(this.bard);

                for (const modifier of modifiers) {
                    html += `<div><small><span class="text-success">${modifier}</span></small></div>`;
                }

                SwalLocale.fire({
                    html,
                    showCancelButton: true,
                    icon: 'info',
                    confirmButtonText: 'Upgrade'
                }).then(result => {
                    if (result.isConfirmed) {
                        game.bank.removeItemQuantity(upgradeItem, 1, true);
                        this.isUpgraded = true;
                        music.upgrade(this.bard);
                        this.updateModifiers();
                    }
                });
            }
        }
    };
}
