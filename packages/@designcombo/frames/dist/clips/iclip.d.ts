interface IClipMeta {
    width: number;
    height: number;
    duration: number;
}
export interface IClip {
    tick: (time: number) => Promise<{
        video?: VideoFrame | ImageBitmap | null;
        audio?: Float32Array[];
        state: "done" | "success";
    }>;
    readonly ready: Promise<IClipMeta>;
    readonly meta: IClipMeta;
    destroy: () => void;
}
export declare const DEFAULT_AUDIO_CONF: {
    sampleRate: number;
    channelCount: number;
    codec: string;
};
export {};
