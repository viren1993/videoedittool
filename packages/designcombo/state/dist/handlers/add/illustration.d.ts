import { State, IIllustration } from '@designcombo/types';

interface IllustrationOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addIllustration(state: State, payload: IIllustration, options?: IllustrationOptions): Promise<Partial<State>>;
export {};
