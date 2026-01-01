import { FabricObject } from 'fabric';
import { default as Timeline } from '../timeline';
import { ITrackItemAndDetails } from '@designcombo/types';

declare class TrackItemsMixin {
    addTrackItem(this: Timeline, trackItem: ITrackItemAndDetails): void;
    alignItemsToTrack(this: Timeline): void;
    updateTrackItemsToHistory(this: Timeline): void;
    deleteTrackItemToHistory(this: Timeline, ids: string[]): void;
    uodateTrackItemIdsOrdering(this: Timeline): void;
    selectTrackItemByIds(this: Timeline, trackItemIds: string[]): void;
    synchronizeTrackItemsState(this: Timeline): void;
    deleteTrackItemById(this: Timeline, ids: string[]): void;
    deleteActiveTrackItem(this: Timeline): false | undefined;
    updateTrackItemCoords(this: Timeline, updateActiveObject?: boolean): void;
    getTrackItems(this: Timeline): FabricObject<Partial<import('fabric').FabricObjectProps>, import('fabric').SerializedObjectProps, import('fabric').ObjectEvents>[];
    setTrackItemCoords(this: Timeline): void;
    setActiveTrackItemCoords(this: Timeline): void;
}
export default TrackItemsMixin;
