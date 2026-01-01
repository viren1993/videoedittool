import { State, IAudio } from '@designcombo/types';

interface AddAudioOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    isNewTrack?: boolean;
}
export declare function addAudio(state: State, payload: IAudio, options?: AddAudioOptions): Promise<Partial<State>>;
export {};
