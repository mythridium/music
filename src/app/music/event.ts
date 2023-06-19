import { Instrument, Music } from './music';

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
    actions?: Set<Instrument>;

    constructor(options: MusicActionEventMatcherOptions, game: Game) {
        super(options, game);

        if (options.actionIDs !== undefined) {
            const music = game.skills.find(skill => skill.id === 'mythMusic:Music') as Music;
            this.actions = music.actions.getSetForConstructor(options.actionIDs, this, Instrument.name);
        }
    }

    doesEventMatch(event: GameEvent): boolean {
        return (
            event instanceof MusicActionEvent &&
            (this.actions === undefined || this.actions.has(event.action)) &&
            super.doesEventMatch(event)
        );
    }
}
