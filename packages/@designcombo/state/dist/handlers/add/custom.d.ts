import { State, IRadialAudioBars, IProgressBar, IProgressFrame, ILinealAudioBars, IProgressSquare } from '@designcombo/types';

interface CustomOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addGeneric(state: State, payload: IProgressBar | IProgressFrame | IRadialAudioBars | ILinealAudioBars | IProgressSquare, options: CustomOptions | undefined, type: "progress-bar" | "progress-frame" | "radial-audio-bars" | "lineal-audio-bars" | "wave-audio-bars" | "hill-audio-bars" | "progress-square"): Promise<Partial<State>>;
export {};
