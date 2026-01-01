import { ITrackItemsMap, ITransition, ITrackItem } from '@designcombo/types';
import { default as Timeline } from '../timeline';

type GroupElement = ITrackItem | ITransition;
export declare const groupTrackItems: (data: {
    trackItemIds: string[];
    transitionsMap: Record<string, ITransition>;
    trackItemsMap: ITrackItemsMap;
}) => GroupElement[][];
export declare const getPrevTransitionDuration: (timeline: Timeline, id: string) => number;
export {};
