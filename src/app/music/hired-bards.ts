import { Music } from './music';
import { Instrument, HiredBard } from './music.types';

export class HiredBards {
    public readonly bards = new Map<Instrument, HiredBard>();

    constructor(private readonly music: Music) {}

    public get(instrument: Instrument): HiredBard | undefined;
    public get(slot: number): HiredBard | undefined;
    public get(slotOrInstrument: Instrument | number): HiredBard | undefined {
        let hiredBard: HiredBard | undefined;

        if (typeof slotOrInstrument === 'number') {
            hiredBard = Array.from(this.bards.values()).find(bard => bard.slot === slotOrInstrument);
        } else {
            const bard = this.music.actions.getObjectByID(slotOrInstrument.id);

            hiredBard = this.bards.get(bard);
        }

        return hiredBard;
    }

    public set(key: Instrument, value: HiredBard) {
        const bard = this.music.actions.getObjectByID(key.id);

        this.bards.set(bard, value);
    }

    public all() {
        return Array.from(this.bards.values());
    }

    public remove(key: Instrument) {
        const bard = this.music.actions.getObjectByID(key.id);

        this.bards.delete(bard);
    }

    public clear() {
        this.bards.clear();
    }

    public isHired(instrument: Instrument) {
        const bard = this.music.actions.getObjectByID(instrument.id);

        return this.bards.has(bard);
    }
}
