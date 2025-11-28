/**
 * Myth Music - Queue-o-Matic Skill Adapter
 * Enables queuing of music training tasks
 *
 * This adapter integrates with Queue-o-Matic (if installed) to allow
 * players to queue music training tasks.
 */

import { Music } from './music';
import { Instrument } from './music.types';

// Declare QueueOMatic globals (available when Queue-o-Matic is installed)
declare const QueueOMaticSkillAdapter: any;
declare const QueueOMaticMod: any;

/**
 * Initialize Queue-o-Matic integration
 * Call this from the main app after mods are loaded
 * @param ctx - The mod context
 * @returns true if integration was successful, false otherwise
 */
export function initQueueOMaticIntegration(ctx: Modding.ModContext): boolean {
    // Check if QueueOMatic is available
    if (typeof QueueOMaticMod === 'undefined' || !QueueOMaticMod?.skillAdapters) {
        console.log('[Myth Music] Queue-o-Matic not detected, skipping integration');
        return false;
    }

    // Check if base class is available
    if (typeof QueueOMaticSkillAdapter === 'undefined') {
        console.log('[Myth Music] Queue-o-Matic base class not available');
        return false;
    }

    // Check if registration function exists
    if (typeof QueueOMaticMod.skillAdapters.registerSkillAdapter !== 'function') {
        console.log('[Myth Music] Queue-o-Matic registerSkillAdapter not available');
        return false;
    }

    try {
        // Define the adapter class here (deferred) so QueueOMaticSkillAdapter is available
        class MythMusicAdapter extends QueueOMaticSkillAdapter {
            constructor() {
                super('mythMusic:Music', 'Music');
            }

            selectAction(instrument: Instrument): void {
                game.music.train(instrument);
            }

            isActionActive(instrument: Instrument): boolean {
                // Check if music skill is the active action
                if (game.activeAction !== game.music) {
                    return false;
                }
                return game.music.activeInstrument === instrument && game.music.isActive;
            }

            getActionName(instrument: Instrument): string {
                return instrument.name;
            }

            getActionIcon(instrument: Instrument): string {
                return instrument.media;
            }

            getActiveActions(): Set<Instrument> {
                const set = new Set<Instrument>();
                if (game.music.activeInstrument && game.music.isActive) {
                    set.add(game.music.activeInstrument);
                }
                return set;
            }

            stop(): void {
                game.music.stop();
            }

            getSkill(): Music {
                return game.music;
            }

            canContinue(_instrument: Instrument): boolean {
                // Music is a gathering skill - no blocking conditions
                return true;
            }

            canBeBlocked(): boolean {
                // Music doesn't consume resources, can't be blocked
                return false;
            }

            getActionId(instrument: Instrument): string {
                return instrument.id;
            }

            getActionFromId(actionId: string): Instrument | undefined {
                return game.music.actions.getObjectByID(actionId);
            }

            setupPatches(ctx: Modding.ModContext): void {
                const patchFn = this.createStandardPatch({
                    getAction: (_skill: Music, instrument: Instrument) => instrument,
                    createActionObject: (_skill: Music, instrument: Instrument) => instrument
                });
                ctx.patch(Music, 'train').replace(patchFn);
            }
        }

        // Create and register the adapter
        const adapter = new MythMusicAdapter();
        QueueOMaticMod.skillAdapters.registerSkillAdapter(ctx, adapter);

        console.log('[Myth Music] Queue-o-Matic integration enabled');
        return true;
    } catch (error) {
        console.error('[Myth Music] Failed to initialize Queue-o-Matic integration:', error);
        return false;
    }
}
