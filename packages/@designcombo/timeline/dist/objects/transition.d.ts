import { Control, Rect, RectProps } from 'fabric';

interface TransitionProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
    tScale: number;
    duration: number;
    fromId: string;
    toId: string;
    kind: string;
    strokeDashArray?: number[];
}
declare class Transition extends Rect {
    static type: string;
    duration: number;
    fromId: string;
    toId: string;
    kind: string;
    isSelected: boolean;
    availableDrop: boolean;
    static createControls(): {
        controls: Record<string, Control>;
    };
    static getDefaults(): Record<string, any>;
    static ownDefaults: {
        objectCaching: boolean;
        borderColor: string;
        stroke: string;
        strokeWidth: number;
        fill: string;
        borderOpacityWhenMoving: number;
        hoverCursor: string;
        lockMovementX: boolean;
        lockMovementY: boolean;
        duration: number;
        rx: number;
        ry: number;
    };
    constructor(props: TransitionProps);
    updateCoords(): void;
    _render(ctx: CanvasRenderingContext2D): void;
    setSelected(selected: boolean): void;
    updateSelected(ctx: CanvasRenderingContext2D): void;
}
export default Transition;
