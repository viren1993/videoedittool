import { IKindHistory, IStateManager, ITrack, IUpdateStateOptions, State, ITimelineScaleState } from '@designcombo/types';
import { Difference } from 'microdiff';
import { Patch } from 'immer';

interface StateManagerConfig {
    cors?: {
        audio?: boolean;
        video?: boolean;
        image?: boolean;
    };
    acceptsMap?: Record<string, string[]>;
    scale?: ITimelineScaleState;
}
interface StateHistory {
    handleUndo: boolean;
    handleRedo: boolean;
}
declare class StateManager implements IStateManager {
    private stateSubject;
    private stateHistorySubject;
    private prevState;
    background: State["background"];
    undos: {
        undos: Difference[];
        type: IKindHistory;
    }[];
    redos: {
        redos: Difference[];
        type: IKindHistory;
    }[];
    private listener;
    constructor(state?: Partial<State>, config?: StateManagerConfig);
    initListeners(): void;
    destroyListeners(): void;
    purge(): void;
    updateHistory(newState: State, type: IKindHistory): void;
    getStateHistory(): StateHistory;
    subscribeHistory(callback: (history: StateHistory) => void): import('rxjs').Subscription;
    getState(): State;
    subscribe(callback: (state: State) => void): import('rxjs').Subscription;
    updateState(partialState: Partial<State>, options?: IUpdateStateOptions): void;
    subscribeToUpdateStateDetails(callback: (stateDetails: {
        size: State["size"];
        background: State["background"];
    }) => void): import('rxjs').Subscription;
    subscribeToScale(callback: (v: {
        scale: State["scale"];
    }) => void): import('rxjs').Subscription;
    subscribeToFps(callback: (fps: {
        fps: State["fps"];
    }) => void): import('rxjs').Subscription;
    subscribeToUpdateTrackItem(callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
    }) => void): import('rxjs').Subscription;
    subscribeToUpdateAnimations(callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
        changedAnimationIds?: string[];
    }) => void): import('rxjs').Subscription;
    subscribeToUpdateTrackItemTiming(callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
        changedTrimIds?: string[];
        changedDisplayIds?: string[];
    }) => void): import('rxjs').Subscription;
    subscribeToUpdateItemDetails(callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
    }) => void): import('rxjs').Subscription;
    subscribeToDuration(callback: (duration: {
        duration: State["duration"];
    }) => void): import('rxjs').Subscription;
    subscribeToHistory(callback: (history: {
        tracks: State["tracks"];
        trackItemsMap: State["trackItemsMap"];
        trackItemIds: State["trackItemIds"];
        transitionIds: State["transitionIds"];
        transitionsMap: State["transitionsMap"];
        type: IKindHistory;
    }) => void): import('rxjs').Subscription;
    subscribeToAddOrRemoveItems(callback: (trackItemIds: {
        trackItemIds: State["trackItemIds"];
    }) => void): import('rxjs').Subscription;
    subscribeToActiveIds(callback: (activeIds: {
        activeIds: State["activeIds"];
    }) => void): import('rxjs').Subscription;
    subscribeToTracks(callback: (tracksUpdate: {
        tracks: State["tracks"];
        changedTracks: string[];
    }) => void): import('rxjs').Subscription;
    subscribeToState(callback: (tracksInfo: {
        tracks: State["tracks"];
        trackItemIds: State["trackItemIds"];
        trackItemsMap: State["trackItemsMap"];
        transitionIds: State["transitionIds"];
        transitionsMap: State["transitionsMap"];
        structure: State["structure"];
    }) => void): import('rxjs').Subscription;
    undo(): void;
    applyPatch(json: any, patches: Patch[]): any;
    redo(): void;
    toJSON(): {
        fps: number;
        tracks: ITrack[];
        size: import('@designcombo/types').ISize;
        trackItemIds: string[];
        transitionsMap: Record<string, import('@designcombo/types').ITransition>;
        trackItemsMap: Record<string, import('@designcombo/types').ITrackItem>;
        transitionIds: string[];
    };
}
export default StateManager;
