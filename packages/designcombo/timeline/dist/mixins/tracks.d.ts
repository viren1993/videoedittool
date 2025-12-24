import { default as Timeline } from '../timeline';
import { ITrackItem } from '@designcombo/types';

declare class TracksMixin {
    findOrCreateTrack(this: Timeline, trackItemData: ITrackItem, { trackId, trackIndex }: {
        trackId?: string;
        trackIndex?: number;
    }): string;
    removeTracks(this: Timeline): void;
    renderTracks(this: Timeline): void;
    filterEmptyTracks(this: Timeline): void;
    refreshTrackLayout(this: Timeline): void;
    adjustMagneticTrack(this: Timeline): void;
}
export default TracksMixin;
