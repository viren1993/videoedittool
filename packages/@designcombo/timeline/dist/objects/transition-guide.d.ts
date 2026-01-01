import { Control, Rect, RectProps } from 'fabric';

interface TransitionGuideProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
}
declare class TransitionGuide extends Rect {
    static type: string;
    duration: number;
    fromId: string;
    toId: string;
    itemType: string;
    isSelected: boolean;
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
    constructor(props: TransitionGuideProps);
    updateCoords(): void;
    _render(ctx: CanvasRenderingContext2D): void;
    drawTextIdentity(ctx: CanvasRenderingContext2D): void;
    setSelected(selected: boolean): void;
    updateSelected(ctx: CanvasRenderingContext2D): void;
}
export default TransitionGuide;
