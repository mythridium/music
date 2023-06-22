import { Music } from './music';

export class Decoder {
    constructor(private readonly music: Music, private readonly start: number) {}

    public decode(reader: SaveWriter) {
        const saveVersions = [
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
                this.music.hiredBard = instrument;
                this.music.userInterface.bard1.setBard(this.music.hiredBard, false);
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
                this.music.hiredBard = instrument;

                if (reader.getBoolean()) {
                    this.music.isBard1Upgraded = true;
                }

                this.music.userInterface.bard1.setBard(this.music.hiredBard, this.music.isBard1Upgraded);
            }
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                this.music.hiredBard2 = instrument;

                if (reader.getBoolean()) {
                    this.music.isBard2Upgraded = true;
                }

                this.music.userInterface.bard2.setBard(this.music.hiredBard2, this.music.isBard2Upgraded);
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
                this.music.hiredBard = instrument;

                if (reader.getBoolean()) {
                    this.music.isBard1Upgraded = true;
                }

                this.music.userInterface.bard1.setBard(this.music.hiredBard, this.music.isBard1Upgraded);
            }
        }

        if (reader.getBoolean()) {
            const instrument = reader.getNamespacedObject(this.music.actions);

            if (typeof instrument === 'string' || instrument.level > this.music.level) {
                this.music.shouldResetAction = true;
            } else {
                this.music.hiredBard2 = instrument;

                if (reader.getBoolean()) {
                    this.music.isBard2Upgraded = true;
                }

                this.music.userInterface.bard2.setBard(this.music.hiredBard2, this.music.isBard2Upgraded);
            }
        }

        if (this.music.shouldResetAction) {
            this.music.resetActionState();
        }
    }
}
