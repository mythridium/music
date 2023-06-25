import { Music } from '../music';
import { HiredBard } from '../music.types';
import { DecodeVersion } from './version.base';

/**
 * Legacy save version, didn't realise saves were this finicky and should have saved version number initially.
 * Had to do save version as string so I could read it properly.
 */
export class Version1 implements DecodeVersion {
    constructor(private readonly music: Music) {}

    public decode(reader: SaveWriter) {
        const skillVersionString = reader.getString();

        // Try parsing the version - this is painful because I didn't save a version number initially, needed this gimicky
        // work around as there is no way to tell data is legacy other then failing.
        const version = parseInt(skillVersionString.split('mythMusicVersion:')[1].split(':')[0]);

        if (version !== 1) {
            throw new Error(`Did not read correct version number: ${version} - trying version 1`);
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                this.music.activeInstrument = instrument;
            }
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                const hiredBard: HiredBard = {
                    instrument,
                    slot: 1,
                    isUpgraded: false,
                    socket: undefined,
                    utility: undefined
                };

                if (reader.getBoolean()) {
                    hiredBard.isUpgraded = true;
                }

                this.music.bards.set(instrument, hiredBard);

                this.music.userInterface.bard1.setBard(hiredBard);
            }
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                const hiredBard: HiredBard = {
                    instrument,
                    slot: 2,
                    isUpgraded: false,
                    socket: undefined,
                    utility: undefined
                };

                if (reader.getBoolean()) {
                    hiredBard.isUpgraded = true;
                }

                this.music.bards.set(instrument, hiredBard);

                this.music.userInterface.bard2.setBard(hiredBard);
            }
        }

        if (this.music.shouldResetAction) {
            this.music.resetActionState();
        }
    }
}
