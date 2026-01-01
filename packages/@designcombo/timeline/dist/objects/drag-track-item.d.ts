import { Rect, RectProps } from 'fabric';

export interface PreviewTrackItemProps extends Pick<RectProps, "width" | "height" | "top" | "left"> {
    id: string;
    type: string;
    duration: number;
}
declare class PreviewTrackItem extends Rect {
    static type: string;
    duration: number;
    fromId: string;
    toId: string;
    isSelected: boolean;
    name: string;
    durationString: string;
    itemType: string;
    static getDefaults(): Record<string, any>;
    static ownDefaults: {
        objectCaching: boolean;
        borderColor: string;
        stroke: string;
        strokeWidth: number;
        borderOpacityWhenMoving: number;
        hoverCursor: string;
        rx: number;
        ry: number;
    };
    constructor(props: PreviewTrackItemProps);
    _render(ctx: CanvasRenderingContext2D): void;
    drawTextIdentity(ctx: CanvasRenderingContext2D): void;
    private drawRoundedRect;
}
export default PreviewTrackItem;
