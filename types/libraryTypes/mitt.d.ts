import {
    EventType as _EventType,
    Handler as _Handler,
    WildcardHandler as _WildcardHandler,
    EventHandlerMap,
    Emitter
} from 'mitt';

declare global {
    function mitt<Events extends Record<_EventType, unknown>>(all?: EventHandlerMap<Events>): Emitter<Events>;

    interface MittHandler<T> extends _Handler<T> {}
}
