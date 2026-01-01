import { ITrack, ITrackItem } from '@designcombo/types';

export declare const findTargetTrack: (trackItemIds: string[], tracks: ITrack[], trackItemsMap: Record<string, ITrackItem>, trackId?: string, trackIndex?: number) => {
    trackId: string | undefined;
    trackIndex: number | undefined;
};
