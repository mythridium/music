import { Music } from '../music';
import { HiredBard } from '../music.types';
import { DecodeVersion } from './version.base';

export class Version4 implements DecodeVersion {
    constructor(private readonly game: Game, private readonly music: Music) {}

    public decode(reader: SaveWriter) {
        const version = reader.getUint32();

        if (version !== 4) {
            throw new Error(`Did not read correct version number: ${version} - trying version 4`);
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);
            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                this.music.activeInstrument = instrument;
            }
        }

        reader.getArray(reader => {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument !== 'string') {
                const masteriesUnlocked: boolean[] = [];

                reader.getArray(reader => {
                    const isUnlocked = reader.getBoolean();
                    masteriesUnlocked.push(isUnlocked);
                });

                this.music.masteriesUnlocked.set(instrument, masteriesUnlocked);
            } else {
                reader.getArray(reader => reader.getBoolean());
            }
        });

        reader.getComplexMap(reader => {
            const instrument = reader.getNamespacedObject(this.music.actions);
            const slot = reader.getUint32();
            const isUpgraded = reader.getBoolean();
            let socket: string | Item;

            if (reader.getBoolean()) {
                socket = reader.getNamespacedObject(this.game.items);
            }

            let utility: string | Item;

            if (reader.getBoolean()) {
                utility = reader.getNamespacedObject(this.game.items);
            }

            let hiredBard: HiredBard;

            if (typeof instrument !== 'string') {
                hiredBard = {
                    instrument,
                    slot,
                    isUpgraded,
                    socket: typeof socket !== 'string' ? socket : undefined,
                    utility: typeof utility !== 'string' ? utility : undefined
                };

                this.music.bards.set(instrument, hiredBard);
            }

            return {
                key: instrument,
                value: hiredBard
            };
        });

        const bard1 = this.music.bards.get(1);
        const bard2 = this.music.bards.get(2);
        const bard3 = this.music.bards.get(3);

        this.music.userInterface.bard1.setBard(bard1);
        this.music.userInterface.bard2.setBard(bard2);
        this.music.userInterface.bard3.setBard(bard3);

        if (this.music.shouldResetAction) {
            this.music.resetActionState();
        }
    }
}
