import { Rect } from 'fabric';
import { IMetadata } from '@designcombo/types';

export interface TrackItemProps extends Pick<Rect, "top" | "left" | "width" | "height"> {
    id: string;
    top: number;
    left: number;
    tScale: number;
    accepts: string[];
    items: string[];
    magnetic?: boolean;
    static?: boolean;
    metadata?: Partial<IMetadata>;
}
declare class Track extends Rect {
    static ownDefaults: Partial<Rect<Partial<import('fabric').RectProps>, import('fabric').SerializedRectProps, import('fabric').ObjectEvents>>;
    static type: string;
    id: string;
    accepts: string[];
    metadata?: Partial<IMetadata>;
    items: string[];
    magnetic?: boolean;
    static?: boolean;
    static getDefaults(): Record<string, any>;
    constructor(props: TrackItemProps);
    updateCoords(size: number): void;
}
export default Track;
