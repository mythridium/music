import { Music } from '../music';
import { HiredBard } from '../music.types';
import { DecodeVersion } from './version.base';

export class Version0 implements DecodeVersion {
    constructor(private readonly music: Music) {}

    public decode(reader: SaveWriter) {
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

                this.music.bards.set(instrument, hiredBard);

                this.music.userInterface.bard1.setBard(hiredBard);
            }
        }

        if (this.music.shouldResetAction) {
            this.music.resetActionState();
        }
    }
}
