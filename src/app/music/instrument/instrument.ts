import { Music } from '../music';
import { Instrument } from '../music.types';

import './instrument.scss';

export function InstrumentComponent(music: Music, instrument: Instrument, game: Game) {
    return {
        $template: '#myth-music-instrument',
        instrument,
        instrumentName: instrument.name,
        media: instrument.media,
        id: instrument.id,
        localId: instrument.localID.toLowerCase(),
        minGP: 0,
        maxGP: 0,
        disabled: false,
        progressBar: {} as ProgressBar,
        mounted: function () {
            const grantsContainer = document
                .querySelector(`#${this.localId}`)
                .querySelector('#grants-container') as HTMLElement;

            this.xpIcon = new XPIcon(grantsContainer, 0, 0, 32);
            this.masteryIcon = new MasteryXPIcon(grantsContainer, 0, 0, 32);
            this.masteryPoolIcon = new MasteryPoolIcon(grantsContainer, 0, 32);
            this.intervalIcon = new IntervalIcon(grantsContainer, 0, 32);

            const progressBar = document
                .querySelector(`#${this.localId}`)
                .querySelector('.progress-bar') as HTMLElement;

            this.progressBar = new ProgressBar(progressBar, 'bg-secondary');
        },
        updateGrants: function (
            xp: number,
            baseXP: number,
            masteryXP: number,
            baseMasteryXP: number,
            masteryPoolXP: number,
            interval: number
        ) {
            this.xpIcon.setXP(xp, baseXP);
            this.masteryIcon.setXP(masteryXP, baseMasteryXP);
            this.masteryPoolIcon.setXP(masteryPoolXP);
            this.intervalIcon.setInterval(interval);
        },
        updateGPRange: function () {
            let minGP = this.getMinGPRoll();
            let maxGP = this.getMaxGPRoll();

            const gpModifier = this.getGPModifier();
            const modGp = (gp: number) => {
                gp *= 1 + gpModifier / 100;
                gp = Math.floor(gp + game.modifiers.increasedGPFlat);
                return gp;
            };

            minGP = modGp(minGP);
            maxGP = modGp(maxGP);

            this.minGP = minGP;
            this.maxGP = maxGP;
        },
        train: function () {
            music.train(instrument);
        },
        hire: function () {
            music.hire(instrument);
        },
        mastery: function () {
            music.unlockMastery(instrument);
        },
        updateDisabled: function () {
            this.disabled = music.bards.isHired(instrument);
        },
        getSkillIcons: function () {
            return instrument.skills.map(skillId => {
                return game.skills.find(skill => skill.id === skillId)?.media;
            });
        },
        getMinGPRoll: function () {
            return Math.max(1, Math.floor(this.getMaxGPRoll() / 100));
        },
        getMaxGPRoll: function () {
            return instrument.maxGP + music.getMasteryLevel(instrument) * 10;
        },
        getGPModifier: function () {
            let increasedGPModifier = game.modifiers.increasedGPGlobal - game.modifiers.decreasedGPGlobal;
            increasedGPModifier += game.modifiers.increasedMusicGP - game.modifiers.decreasedMusicGP;

            return increasedGPModifier;
        }
    };
}
