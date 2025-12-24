import { default as Timeline } from '../timeline';

declare class TransitionsMixin {
    removeTransitions(this: Timeline): void;
    renderTransitions(this: Timeline): void;
    updateTrackTransitionsItemCoords(this: Timeline): void;
    alignTransitionsToTrack(this: Timeline, alignActiveObjects?: boolean): void;
    updateTransitions(this: Timeline, handleListeners?: boolean): void;
}
export default TransitionsMixin;
