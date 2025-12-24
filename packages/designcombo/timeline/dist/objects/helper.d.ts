import { Group, GroupProps, Rect } from 'fabric';
import { IMetadata, ItemType } from '@designcombo/types';

export interface HelperProps extends Partial<GroupProps> {
    id: string;
    metadata: Partial<IMetadata>;
    tScale: number;
    kind: "top" | "center" | "bottom";
    activeGuideFill?: string;
}
declare class Helper extends Group {
    static type: string;
    guide: Rect;
    topGuide: Rect;
    bottomGuide: Rect;
    metadata: Partial<IMetadata>;
    accepts: ItemType[];
    kind: string;
    activeGuideFill?: string;
    static getDefaults(): Record<string, any>;
    static ownDefaults: {
        selectable: boolean;
        evented: boolean;
    };
    constructor(props: HelperProps);
    updateCoords(size: number): void;
    setSelected(selected: boolean): void;
}
export default Helper;
