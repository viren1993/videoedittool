import { Canvas, FabricObject, TPointerEvent } from 'fabric';
import { CanvasSpacing } from '@designcombo/types';

export declare const clearPlaceholderObjects: (canvas: Canvas, placeholderMovingObjects: FabricObject[]) => void;
export declare const clearTrackHelperGuides: (allObjects: FabricObject[]) => void;
export declare const isHelperTrack: (obj: FabricObject | undefined) => boolean;
export declare const calcCanvasSpacing: (payload?: Partial<CanvasSpacing>) => CanvasSpacing;
export declare const isTouchEvent: (event: TPointerEvent) => boolean;
