export declare const calculateBoundingBoxWidth: (elementWidth: number, elementHeight: number, rotateAngle: number, scaleValue: number) => number;
export interface BoundingBoxPoint {
    x: number;
    y: number;
}
export interface BoundingBoxCorners {
    topLeft: BoundingBoxPoint;
    topRight: BoundingBoxPoint;
    bottomLeft: BoundingBoxPoint;
    bottomRight: BoundingBoxPoint;
    center: BoundingBoxPoint;
    width: number;
    height: number;
}
export declare const getBoundingBoxCorners: (elementX: number, // Posición X del elemento (centro)
elementY: number, // Posición Y del elemento (centro)
elementWidth: number, elementHeight: number, rotationAngle: number, // Ángulo en grados
scaleValue?: number) => BoundingBoxCorners;
export declare const getRotatedElementCorners: (elementX: number, elementY: number, elementWidth: number, elementHeight: number, rotationAngle: number, scaleValue?: number) => BoundingBoxPoint[];
export declare const replaceTranslateX: (transformString: string, newTranslateXValue: number) => string;
export declare const replaceTranslateXFlexible: (transformString: string, newTranslateXValue: number, unit?: string) => string;
