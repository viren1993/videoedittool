import { FabricObject, Point } from 'fabric';

export declare const detectOverObject: (point: Point, objects: FabricObject[]) => {
    isOverObject: boolean;
    overObjects: FabricObject<Partial<import('fabric').FabricObjectProps>, import('fabric').SerializedObjectProps, import('fabric').ObjectEvents>[];
};
