export function isAoD() {
    return (
        typeof GameEventSystem !== 'undefined' &&
        GameEventSystem?.prototype?.constructMatcher !== undefined &&
        typeof CDNDIR === 'function'
    );
}
