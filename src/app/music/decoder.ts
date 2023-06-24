import { Music } from './music';
import { HiredBard } from './music.types';

export class Decoder {
    constructor(private readonly music: Music, private readonly start: number) {}

    public decode(reader: SaveWriter) {
        const saveVersions = [
            this.loadSaveFactory(() => this.version3(reader)),
            this.loadSaveFactory(() => this.version2(reader)),
            this.loadSaveFactory(() => this.version1(reader)),
            this.loadSaveFactory(() => this.version0(reader))
        ];

        for (const save of saveVersions) {
            const isLoaded = save();

            // Loaded the save successfully.
            if (isLoaded) {
                break;
            }

            // Reset the byte offset if we failed to load this version of the save.
            reader.byteOffset = this.start;
        }
    }

    private loadSaveFactory(callback: () => void) {
        return () => {
            let isLoaded = false;

            try {
                callback();
                isLoaded = true;
            } catch (e) {
                console.warn('Failed to load music save', e);
            }

            return isLoaded;
        };
    }

    private version0(reader: SaveWriter) {
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

    /**
     * Legacy save version, didn't realise saves were this finicky and should have saved version number initially.
     * Had to do save version as string so I could read it properly.
     */
    private version1(reader: SaveWriter) {
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

    private version2(reader: SaveWriter) {
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

    private version3(reader: SaveWriter) {
        const version = reader.getUint32();

        if (version !== 3) {
            throw new Error(`Did not read correct version number: ${version} - trying version 3`);
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);
            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                this.music.activeInstrument = instrument;
            }
        }

        reader.getComplexMap(reader => {
            const instrument = reader.getNamespacedObject(this.music.actions);
            const slot = reader.getUint32();
            const isUpgraded = reader.getBoolean();
            let socket: string | Item;

            if (reader.getBoolean()) {
                socket = reader.getNamespacedObject(game.items);
            }

            let utility: string | Item;

            if (reader.getBoolean()) {
                utility = reader.getNamespacedObject(game.items);
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

            const bard1 = this.music.bards.get(1);
            const bard2 = this.music.bards.get(2);

            this.music.userInterface.bard1.setBard(bard1);
            this.music.userInterface.bard2.setBard(bard2);

            return {
                key: instrument,
                value: hiredBard
            };
        });
    }
}
