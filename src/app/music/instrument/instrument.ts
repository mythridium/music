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
        progressBar: {} as ProgressBarElement,
        mounted: function () {
            const grantsContainer = document
                .querySelector(`#${this.localId}`)
                .querySelector('#grants-container') as HTMLElement;

            this.xpIcon = grantsContainer.querySelector('#music-xp');
            this.masteryIcon = grantsContainer.querySelector('#music-mastery-xp');
            this.masteryPoolIcon = grantsContainer.querySelector('#music-pool-xp');
            this.intervalIcon = grantsContainer.querySelector('#music-interval');

            this.progressBar = document
                .querySelector(`#${this.localId}`)
                // @ts-ignore // TODO: TYPES
                .querySelector<ProgressBarElement>('progress-bar');
        },
        updateGrants: function (
            xp: number,
            baseXP: number,
            masteryXP: number,
            baseMasteryXP: number,
            masteryPoolXP: number,
            interval: number,
            // @ts-ignore // TODO: TYPES
            realm: Realm
        ) {
            this.xpIcon.setXP(xp, baseXP);
            this.xpIcon.setSources(game.music.getXPSources(instrument));
            this.masteryIcon.setXP(masteryXP, baseMasteryXP);
            this.masteryIcon.setSources(game.music.getMasteryXPSources(instrument));
            this.masteryPoolIcon.setXP(masteryPoolXP);
            // @ts-ignore // TODO: TYPES
            game.unlockedRealms.length > 1 ? this.masteryPoolIcon.setRealm(realm) : this.masteryPoolIcon.hideRealms();
            // @ts-ignore // TODO: TYPES
            this.intervalIcon.setInterval(interval, music.getIntervalSources(instrument));
        },
        updateGPRange: function () {
            let minGP = this.getMinGPRoll();
            let maxGP = this.getMaxGPRoll();

            const gpModifier = this.getGPModifier();
            const modGp = (gp: number) => {
                gp *= 1 + gpModifier / 100;
                // @ts-ignore // TODO: TYPES
                gp = Math.floor(gp + game.modifiers.getValue('melvorD:flatCurrencyGain', game.gp.modQuery));
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
            // @ts-ignore // TODO: TYPES
            let increasedGPModifier = game.music.getCurrencyModifier(game.gp);
            // @ts-ignore // TODO: TYPES
            increasedGPModifier += game.modifiers.getValue('mythMusic:musicGP', game.gp.modQuery);

            return increasedGPModifier;
        }
    };
}
