import { Music } from '../music';
import { HiredBard } from '../music.types';
import { DecodeVersion } from './version.base';

export class Version2 implements DecodeVersion {
    constructor(private readonly music: Music) {}

    public decode(reader: SaveWriter) {
        const version = reader.getUint32();

        if (version !== 2) {
            throw new Error(`Did not read correct version number: ${version} - trying version 2`);
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
