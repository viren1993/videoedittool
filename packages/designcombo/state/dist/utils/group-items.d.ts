import { ITrackItemsMap, ITransition, ITrackItem } from '@designcombo/types';

export type GroupElement = ITrackItem | ITransition;
export declare const groupTrackItems: (data: {
    trackItemIds: string[];
    transitionsMap: Record<string, ITransition>;
    trackItemsMap: ITrackItemsMap;
}) => GroupElement[][];
