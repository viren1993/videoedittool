import { State, IText } from '@designcombo/types';

interface TextOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    isNewTrack?: boolean;
    size?: {
        width: number;
        height: number;
    };
}
export declare function addText(state: State, payload: Partial<IText>, options?: TextOptions): Promise<Partial<State>>;
export {};
