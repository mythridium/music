import { Music } from './music';
import { Instrument } from './music.types';

export class MusicActionEvent extends SkillActionEvent {
    public skill: Music;
    public action: Instrument;

    constructor(skill: Music, action: Instrument) {
        super();
        this.skill = skill;
        this.action = action;
    }
}

export interface MusicActionEventMatcherOptions extends SkillActionEventMatcherOptions {
    type: 'MusicAction';
    actionIDs?: string[];
}

export class MusicActionEventMatcher extends SkillActionEventMatcher {
    /** If present, the recipe of the action must match a member */
    public actions?: Set<Instrument>;
    public type = 'MusicAction';

    constructor(options: MusicActionEventMatcherOptions, game: Game) {
        super(options, game);

        if (options.actionIDs !== undefined) {
            const music = game.skills.find(skill => skill.id === 'mythMusic:Music') as Music;
            this.actions = music.actions.getSetForConstructor(options.actionIDs, this, Instrument.name);
        }
    }

    public doesEventMatch(event: GameEvent): boolean {
        return (
            event instanceof MusicActionEvent &&
            (this.actions === undefined || this.actions.has(event.action)) &&
            super.doesEventMatch(event)
        );
    }

    public _assignNonRaidHandler(handler: MittHandler<unknown>) {
        const music = this.game.skills.getObjectByID('mythMusic:Music') as Music;
        music.on('action', handler);
    }

    public _unassignNonRaidHandler(handler: MittHandler<unknown>) {
        const music = this.game.skills.getObjectByID('mythMusic:Music') as Music;
        music.off('action', handler);
    }
}
