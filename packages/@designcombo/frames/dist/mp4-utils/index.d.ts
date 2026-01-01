/// <reference path="../../src/types/mp4box.d.ts" />
/// <reference types="dom-webcodecs" />
import { MP4File } from "mp4box";
type TCleanFn = () => void;
interface IRecodeMuxOpts {
    video: {
        width: number;
        height: number;
        expectFPS: number;
        codec: string;
        bitrate: number;
        __unsafe_hardwareAcceleration__?: HardwareAcceleration;
    } | null;
    audio: {
        codec: "opus" | "aac";
        sampleRate: number;
        channelCount: number;
    } | null;
    duration?: number;
    metaDataTags?: Record<string, string>;
}
export declare function recodemux(opts: IRecodeMuxOpts): {
    encodeVideo: (frame: VideoFrame, options: VideoEncoderEncodeOptions, gopId?: number) => void;
    encodeAudio: (data: AudioData) => void;
    close: TCleanFn;
    flush: () => Promise<void>;
    mp4file: MP4File;
    getEncodeQueueSize: () => number;
};
export declare function _deprecated_stream2file(stream: ReadableStream<Uint8Array>): {
    file: MP4File;
    stop: () => void;
};
export declare function file2stream(file: MP4File, timeSlice: number, onCancel?: TCleanFn): {
    stream: ReadableStream<Uint8Array>;
    stop: (err?: Error) => void;
};
export declare function fastConcatMP4(streams: ReadableStream<Uint8Array>[]): Promise<ReadableStream<Uint8Array>>;
export declare function fixFMP4Duration(stream: ReadableStream<Uint8Array>): Promise<ReadableStream<Uint8Array>>;
export declare function mixinMP4AndAudio(mp4Stream: ReadableStream<Uint8Array>, audio: {
    stream: ReadableStream<Uint8Array>;
    volume: number;
    loop: boolean;
}): ReadableStream<Uint8Array>;
export {};
