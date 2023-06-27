import { Music } from '../music';

import './locked.scss';

export function LockedComponent(music: Music) {
    return {
        $template: '#myth-instrument-locked',
        isVisible: false,
        level: 1,
        get icon() {
            return music.getMediaURL('assets/locked-instrument.png');
        },
        update: function () {
            const nextUnlock = this.getNextUnlock();

            this.isVisible = nextUnlock !== undefined;
            this.level = nextUnlock?.level ?? 1;
        },
        getNextUnlock: function () {
            return music.actions.find(action => action.level > music.level);
        }
    };
}
