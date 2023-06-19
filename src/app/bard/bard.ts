import { Instrument, Music } from '../music/music';
import './bard.scss';

interface BardModifiers {
    description: string;
    isActive: boolean;
    level: number;
}

export interface IBardComponent extends ComponentProps {
    $template: string;
    bard: {};
    modifiers: BardModifiers[];
    setBard: (instrument: Instrument) => void;
    updateModifiers: () => BardModifiers[];
    getModifiers: (instrument: Instrument) => BardModifiers[];
}

export function BardComponent(music: Music, game: Game): IBardComponent {
    return {
        $template: '#myth-music-bard',
        bard: {},
        modifiers: [] as BardModifiers[],
        setBard: function (instrument: Instrument) {
            this.bard = instrument;
        },
        updateModifiers: function () {
            if (!this.bard.id) {
                return [] as BardModifiers[];
            }

            this.modifiers = this.getModifiers(this.bard);
        },
        getModifiers: function (instrument: Instrument) {
            if (!instrument.id) {
                return [] as BardModifiers[];
            }

            return instrument.modifiers.map((modifier: any) => {
                let description = '';

                if ('skill' in modifier) {
                    const mod = { ...modifier };
                    mod.skill = game.skills.find(skill => skill.id === modifier.skill);
                    [description] = printPlayerModifier(modifier.key, mod);
                } else {
                    [description] = printPlayerModifier(modifier.key, modifier.value);
                }

                const bard = music.actions.find(action => action.id === instrument.id);
                const masteryLevel = music.getMasteryLevel(bard);

                return {
                    description,
                    isActive: masteryLevel >= modifier.level,
                    level: modifier.level
                };
            });
        }
    };
}
