import { State, ITrackType } from '@designcombo/types';

interface TrackOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    isNewTrack?: boolean;
}
interface TrackItem {
    id: string;
    type: string | ITrackType;
    details: any;
    [key: string]: any;
}
export declare function manageTracks(currentState: State, trackItems: TrackItem[], options?: TrackOptions): State;
export {};
