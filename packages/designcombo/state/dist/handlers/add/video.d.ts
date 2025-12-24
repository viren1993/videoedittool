import { State, IVideo } from '@designcombo/types';

interface AddVideoOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
    isNewTrack?: boolean;
}
export declare function addVideo(state: State, payload: IVideo, options?: AddVideoOptions): Promise<Partial<State>>;
export {};
