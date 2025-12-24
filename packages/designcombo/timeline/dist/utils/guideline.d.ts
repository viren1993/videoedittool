import { Canvas, FabricObject, TBBox } from 'fabric';
import { default as Timeline } from '../timeline';

export declare const clearAuxiliaryObjects: (canvas: Canvas, allObjects: FabricObject[]) => void;
interface LineGuide {
    val: number;
    start: number;
    end: number;
}
export declare const getLineGuideStops: (skipShapes: FabricObject[], canvas: Canvas) => {
    vertical: LineGuide[];
    horizontal: LineGuide[];
};
export declare const getGuides: (lineGuideStops: {
    vertical: LineGuide[];
    horizontal: LineGuide[];
}, itemBounds: {
    vertical: {
        guide: number;
        offset: number;
        snap: string;
    }[];
    horizontal: {
        guide: number;
        offset: number;
        snap: string;
    }[];
}) => Guide[];
interface Guide {
    lineGuide: number;
    offset: number;
    orientation: "V" | "H";
    snap: string;
    targetDim: {
        start: number;
        end: number;
    };
}
export declare const drawGuides: (guides: Guide[], _: TBBox, canvas: Timeline) => void;
export declare const getObjectSnappingEdges: (target: FabricObject) => {
    vertical: {
        guide: number;
        offset: number;
        snap: string;
    }[];
    horizontal: {
        guide: number;
        offset: number;
        snap: string;
    }[];
};
export declare const getStopsForObject: (start: number, distance: number, drawStart: number, drawDistance: number) => {
    val: number;
    start: number;
    end: number;
}[];
export {};
