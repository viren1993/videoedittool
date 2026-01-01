import { ITrackItemsMap, ITransition, ITrackItem } from '@designcombo/types';
import { FabricObject, RectProps } from 'fabric';

export type GroupElement = ITrackItem | ITransition;
export declare const compareTransitionGroups: (a: GroupElement[], b: GroupElement[]) => boolean;
export declare const groupByTransition: (data: {
    trackItemIds: string[];
    transitionsMap: Record<string, ITransition>;
    trackItemsMap: ITrackItemsMap;
}) => GroupElement[][];
export declare function getNextTransitionMappings(tracks: FabricObject[], trackItems: FabricObject[], currentTransitionsMap: Record<string, ITransition>, positionAfterTransform: Record<string, Pick<RectProps, "left" | "top">>, activeObjectIds: string[]): {
    newTransitionIds: string[];
    newTransitionsMap: Record<string, ITransition>;
};
export declare const getAdjustedTrackItemDimensions: (id: string, transitionGroup: GroupElement[]) => {
    durationDiff: number;
    offsetTransitions: number;
};
