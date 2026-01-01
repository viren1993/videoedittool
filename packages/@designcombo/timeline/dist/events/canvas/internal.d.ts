import { Canvas, FabricObject } from 'fabric';
import { Helper, Placeholder, Track } from '../../objects';

export interface MovingState {
    canvas: Canvas | null;
    enableGuideRedraw: boolean;
    isPointerOverHelperTrack: boolean;
    draggingOverTrack: Track | Helper | null | undefined;
    placeholderMovingObjects: Placeholder[];
    primaryMovingObjects: FabricObject[];
    secondaryMovingObjects: FabricObject[];
    objectInitialPositions: Record<string, {
        top: number;
        left: number;
    }>;
    originTrack: Track | Record<string, any>;
    trackToItemsMap: Record<string, FabricObject[]>;
    activeTrackToItemsMap: Record<string, FabricObject[]>;
    trackTopToIdMap: Record<number, string>;
    trackTops: number[];
    activeObjects: FabricObject[];
    primaryTracks: Record<string, {
        objects: FabricObject[];
        index: number;
    }>;
    secondaryTracks: Record<string, {
        objects: FabricObject[];
        index: number;
    }>;
    isDragOver: boolean;
    initialTrackPoints: number[];
    updateItemsInTrack: string | null;
    orderNormalTrack: boolean;
}
export declare const getState: () => MovingState;
export declare const setState: (updates: Partial<MovingState>) => void;
