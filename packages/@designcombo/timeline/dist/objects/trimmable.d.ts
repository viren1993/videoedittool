import { Control, Rect, RectProps } from 'fabric';
import { ITrim } from '@designcombo/types';

interface IDisplay {
    from: number;
    to: number;
}
export interface TrimmableBaseProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
    tScale: number;
    display: IDisplay;
    trim: ITrim;
}
export type TrimmableProps<T extends object = {}> = TrimmableBaseProps & T;
declare class Trimmable extends Rect {
    static type: string;
    id: string;
    resourceId: string;
    tScale: number;
    isSelected: boolean;
    display: IDisplay;
    trim: ITrim;
    duration: number;
    src: string;
    static createControls(): {
        controls: Record<string, Control>;
    };
    static ownDefaults: {
        rx: number;
        ry: number;
        objectCaching: boolean;
        borderColor: string;
        stroke: string;
        strokeWidth: number;
        fill: string;
        borderOpacityWhenMoving: number;
        hoverCursor: string;
    };
    constructor(options: TrimmableProps);
    _render(ctx: CanvasRenderingContext2D): void;
    setSelected(selected: boolean): void;
    updateSelected(ctx: CanvasRenderingContext2D): void;
    onResizeSnap(): void;
    setSrc(src: string): void;
}
export default Trimmable;
