import { Canvas, CanvasOptions, FabricObject, TPointerEvent } from 'fabric';
import { default as CanvasMixin } from './mixins/canvas';
import { default as TrackItemsMixin } from './mixins/track-items';
import { default as TracksMixin } from './mixins/tracks';
import { default as TransitionsMixin } from './mixins/transitions';
import { ITimelineScaleState, ITrack, ITrackItem, ITransition, IStateManager, IUpdateStateOptions, CanvasSpacing } from '@designcombo/types';

interface Bounding {
    width: number;
    height: number;
}
export interface TimelineOptions extends CanvasOptions {
    bounding?: {
        width: number;
        height: number;
    };
    onScroll?: OnScroll;
    onResizeCanvas?: OnResizeCanvas;
    tScale?: number;
    scale: ITimelineScaleState;
    state?: IStateManager;
    itemTypes: string[];
    sizesMap: Record<string, number>;
    acceptsMap: Record<string, string[]>;
    spacing?: CanvasSpacing;
    withTransitions?: string[];
}
type OnScroll = (v: {
    scrollTop: number;
    scrollLeft: number;
}) => void;
type OnResizeCanvas = (v: {
    width: number;
    height: number;
}) => void;
interface Timeline extends Canvas, CanvasMixin, TrackItemsMixin, TracksMixin, TransitionsMixin {
}
declare class Timeline extends Canvas {
    static objectTypes: string[];
    static registerItems(classes: Record<any, any>): void;
    itemTypes: string[];
    acceptsMap: Record<string, string[]>;
    sizesMap: Record<string, number>;
    objectTypes: string[];
    tracks: ITrack[];
    hoverCornerItem: boolean;
    trackItemsMap: Record<string, ITrackItem>;
    trackItemIds: string[];
    transitionIds: string[];
    transitionsMap: Record<string, ITransition>;
    scale: ITimelineScaleState;
    duration: number;
    bounding: Bounding;
    onScroll?: OnScroll;
    onResizeCanvas?: OnResizeCanvas;
    tScale: number;
    state: IStateManager;
    activeIds: string[];
    spacing: CanvasSpacing;
    guideLineColor: string;
    withTransitions: string[];
    constructor(canvasEl: HTMLCanvasElement, options: Partial<TimelineOptions> & {
        scale: ITimelineScaleState;
        duration: number;
        guideLineColor?: string;
    });
    getItemAccepts(itemType: string): string[];
    getItemSize(itemType: string): number;
    private initializeCanvasDefaults;
    __onMouseDown(e: TPointerEvent): void;
    _setupCurrentTransform(e: TPointerEvent, target: FabricObject, alreadySelected: boolean): void;
    initEventListeners(): void;
    setActiveIds(activeIds: string[]): void;
    updateState(dataHistory?: IUpdateStateOptions): void;
    private getUpdatedState;
    getDurationBasedOnTrackItemsPosition(): number;
    notify(dataHistory?: IUpdateStateOptions): void;
    getState(): {
        tracks: ITrack[];
        trackItemIds: string[];
        trackItemsMap: Record<string, ITrackItem>;
        transitionIds: string[];
        transitionsMap: Record<string, ITransition>;
        scale: ITimelineScaleState;
        duration: number;
    };
    purge(): void;
    scrollTo({ scrollLeft, scrollTop }: {
        scrollLeft?: number;
        scrollTop?: number;
    }): void;
    setBounding(bounding: Bounding): void;
    calcBounding(): void;
    setViewportPos(posX: number, posY: number): void;
    getViewportPos(posX: number, posY: number): {
        x: number;
        y: number;
    };
    setScale(scale: ITimelineScaleState): void;
}
export default Timeline;
