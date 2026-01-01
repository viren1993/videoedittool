import { State, IComposition } from '@designcombo/types';

interface CompositionOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addComposition(state: State, payload: IComposition | any, options?: CompositionOptions): Promise<Partial<State>>;
export {};
