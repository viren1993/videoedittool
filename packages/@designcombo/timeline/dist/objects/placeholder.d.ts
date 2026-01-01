import { FabricObject, Rect, RectProps } from 'fabric';
import { ItemType } from '@designcombo/types';

interface PlaceholderProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
}
declare class Placeholder extends Rect {
    static type: string;
    guideItemId?: string;
    distXToActCenter?: number;
    trackItemType?: ItemType;
    defaultPos?: {
        x: number;
        y: number;
    };
    draggedObject: FabricObject;
    static getDefaults(): Record<string, any>;
    static ownDefaults: {
        rx: number;
        ry: number;
        objectCaching: boolean;
        borderColor: string;
        strokeWidth: number;
        fill: string;
        stroke: string;
        selectable: boolean;
        borderOpacityWhenMoving: number;
        hoverCursor: string;
        strokeDashArray: number[];
        evented: boolean;
    };
    constructor(props: PlaceholderProps);
    _render(ctx: CanvasRenderingContext2D): void;
    updateSelected(ctx: CanvasRenderingContext2D): void;
}
export default Placeholder;
