import { Control, Rect, RectProps } from 'fabric';
import { IDisplay } from '@designcombo/types';

export interface ResizableBaseProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
    tScale: number;
    display: IDisplay;
}
export type ResizableProps<T extends object = {}> = ResizableBaseProps & T;
declare class Resizable extends Rect {
    static type: string;
    id: string;
    isSelected: boolean;
    tScale: number;
    display: IDisplay;
    static createControls(): {
        controls: Record<string, Control>;
    };
    static getDefaults(): Record<string, any>;
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
    constructor(props: ResizableProps);
    setSelected(selected: boolean): void;
    _render(ctx: CanvasRenderingContext2D): void;
    updateSelected(ctx: CanvasRenderingContext2D): void;
}
export default Resizable;
