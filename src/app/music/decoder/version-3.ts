import { Music } from '../music';
import { HiredBard } from '../music.types';
import { DecodeVersion } from './version.base';

export class Version3 implements DecodeVersion {
    constructor(private readonly game: Game, private readonly music: Music) {}

    public decode(reader: SaveWriter) {
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

            const bard1 = this.music.bards.get(1);
            const bard2 = this.music.bards.get(2);

            this.music.userInterface.bard1.setBard(bard1);
            this.music.userInterface.bard2.setBard(bard2);

            return {
                key: instrument,
                value: hiredBard
            };
        });

        // Migrate legacy data to new unlocked state.
        for (const action of this.music.actions.allObjects) {
            const masteryLevel = this.music.getMasteryLevel(action);
            const isUnlocked = action
                .modifiers(this.music.settings.modifierType)
                .filter(modifier => modifier.level <= 100)
                .map(modifier => modifier.level <= masteryLevel);

            this.music.masteriesUnlocked.set(action, isUnlocked);
        }
    }
}
