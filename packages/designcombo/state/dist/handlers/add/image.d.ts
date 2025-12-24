import { State, IImage } from '@designcombo/types';

interface AddImageOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
    isNewTrack?: boolean;
}
export declare function addImage(state: State, payload: IImage, options?: AddImageOptions): Promise<Partial<State>>;
export {};
