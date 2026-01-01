import { State, ICaption, ITrack } from '@designcombo/types';

interface CaptionsPayload {
    trackItems: ICaption[];
    tracks: ITrack[];
}
interface CaptionsOptions {
    trackIndex?: number;
    trackId?: string;
    isNewTrack?: boolean;
    size?: {
        width: number;
        height: number;
    };
}
export declare function addCaptions(state: State, payload: CaptionsPayload, options?: CaptionsOptions): Promise<Partial<State>>;
export {};
