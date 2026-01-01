import { TMat2D, TPointerEvent } from 'fabric';
import { default as Timeline } from '../timeline';
import { ScrollbarProps, ScrollbarsProps, ScrollbarXProps, ScrollbarYProps } from './types';

export declare class Scrollbars {
    canvas: Timeline;
    fill: string;
    stroke: string;
    lineWidth: number;
    hideX: boolean;
    hideY: boolean;
    scrollbarMinWidth: number;
    scrollbarSize: number;
    scrollSpace: number;
    padding: number;
    extraMarginX: number;
    extraMarginY: number;
    offsetX: number;
    offsetY: number;
    scrollbarWidth: number;
    scrollbarColor: string;
    onViewportChange?: (left: number) => void;
    private _bar?;
    private _barViewport;
    private _originalMouseDown;
    private _originalMouseMove;
    private _originalMouseUp;
    constructor(canvas: Timeline, props?: ScrollbarsProps);
    initBehavior(): void;
    getScrollbar(e: TPointerEvent): {
        type: string;
        start: number;
        vpt: TMat2D;
    } | undefined;
    mouseDownHandler(e: TPointerEvent): void;
    mouseMoveHandler(e: TPointerEvent): void;
    mouseUpHandler(e: TPointerEvent): void;
    beforeRenderHandler(): void;
    afterRenderHandler(): void;
    render(ctx: CanvasRenderingContext2D, mapRect: ScrollbarProps, objectRect: ScrollbarProps): void;
    drawScrollbarX(ctx: CanvasRenderingContext2D, mapRect: ScrollbarXProps, objectRect: ScrollbarXProps): void;
    drawScrollbarY(ctx: CanvasRenderingContext2D, mapRect: ScrollbarYProps, objectRect: ScrollbarYProps): void;
    drawRect(ctx: CanvasRenderingContext2D, props: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): void;
    getObjectsBoundingRect(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    applyViewportLimits(vpt: TMat2D): void;
    dispose(): void;
}
