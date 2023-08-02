import { Music } from '../music';
import { BardModifier, Instrument } from '../music.types';

import './mastery.scss';

enum State {
    View = 'view',
    Unlock = 'unlock'
}

interface EssenceOfMusic {
    item: AnyItem;
    quantity: number;
}

export function MasteryComponent(game: Game, music: Music, instrument: Instrument) {
    return {
        $template: '#myth-music-mastery',
        instrument,
        state: State.View,
        modifier: undefined as BardModifier,
        essenceOfMusic: undefined as EssenceOfMusic,
        unlockGPCost: 0,
        get unlockableModifiers() {
            const modifiers = music.manager.getModifiers(instrument);

            return modifiers.filter(modifier => modifier.level < 100);
        },
        get currentMasteryLevel() {
            return music.getMasteryLevel(instrument);
        },
        mounted: function () {
            this.updateCosts();
        },
        isUnlocked: function (index: number) {
            const instrumentRef = music.actions.find(action => action.id === instrument.id);
            const unlockedMasteries = music.masteriesUnlocked.get(instrumentRef);

            return unlockedMasteries[index];
        },
        canUnlock: function (modifier: BardModifier) {
            const masteryLevel = music.getMasteryLevel(instrument);

            return masteryLevel >= modifier.level;
        },
        getNextHireCost: function () {
            const { costs, unlocked } = music.manager.calculateHireCost(instrument);

            return formatNumber(costs[unlocked]);
        },
        ok: function () {
            SwalLocale.clickConfirm();
        },
        setState: function (state: State, modifier: BardModifier | undefined) {
            this.state = state;
            this.modifier = modifier;

            if (!this.modifier) {
                this.unlockGPCost = 100000;
                return;
            }

            switch (this.modifier.level) {
                case 40:
                default:
                    this.unlockGPCost = 100000;
                    break;
                case 75:
                    this.unlockGPCost = 1000000;
                    break;
                case 99:
                    this.unlockGPCost = 10000000;
                    break;
            }
        },
        unlock: function (modifier: BardModifier) {
            game.bank.removeItemQuantityByID('mythMusic:Essence_Of_Music', 1, true);
            game.gp.remove(this.unlockGPCost);

            const instrumentRef = music.actions.find(action => action.id === instrument.id);
            const index = instrumentRef.modifiers.findIndex(mod => mod.level === modifier.level);
            const unlockedMasteries = music.masteriesUnlocked.get(instrumentRef);

            unlockedMasteries[index] = true;

            music.masteriesUnlocked.set(instrumentRef, unlockedMasteries);

            this.updateCosts();
            this.completeUpgrade();
        },
        updateCosts: function () {
            const item = game.items.getObjectByID(`mythMusic:Essence_Of_Music`);

            this.essenceOfMusic = {
                item,
                quantity: game.bank.getQty(item)
            };
        },
        completeUpgrade: function () {
            music.computeProvidedStats(true);
            music.renderQueue.bardModifiers = true;
            music.renderQueue.gpRange = true;
            music.renderQueue.grants = true;

            this.state = State.View;
        }
    };
}
