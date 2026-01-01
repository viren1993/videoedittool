import { State, IShape } from '@designcombo/types';

interface ShapeOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addShape(state: State, payload: IShape, options?: ShapeOptions): Promise<Partial<State>>;
export {};
