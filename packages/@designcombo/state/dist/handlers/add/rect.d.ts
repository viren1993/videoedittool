import { State, IRect } from '@designcombo/types';

interface RectOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addRect(state: State, payload: IRect, options?: RectOptions): Promise<Partial<State>>;
export {};
