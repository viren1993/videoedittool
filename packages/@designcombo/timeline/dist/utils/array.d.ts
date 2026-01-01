import { ITrack } from '@designcombo/types';

export declare function findRelativePosition(arr: number[], referenceValue: number, targetValue: number): number | null;
export declare function createCombinedTracksArray(refTrack: ITrack, newTracks: (ITrack & {
    tempIndex: number;
})[]): ITrack[];
