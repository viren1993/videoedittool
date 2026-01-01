import { ITrackItem } from '@designcombo/types';

export declare function timeMsToUnits(timeMs: number, zoom?: number, playbackRate?: number): number;
export declare function unitsToTimeMs(units: number, zoom?: number, playbackRate?: number): number;
export declare function calculateTimelineWidth(totalLengthMs: number, zoom?: number): number;
export declare const getDuration: (trackItems: Record<string, ITrackItem>) => number;
