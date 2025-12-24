/// <reference path="../../src/types/mp4box.d.ts" />
/// <reference types="dom-webcodecs" />
import { MP4Sample } from "mp4box";
import { IClip } from "./iclip";
import { file } from "opfs-tools";
type OPFSToolFile = ReturnType<typeof file>;
type MPClipCloneArgs = Awaited<ReturnType<typeof parseMP4Stream>> & {
    localFile: OPFSToolFile;
};
interface MP4DecoderConf {
    video: VideoDecoderConfig | null;
    audio: AudioDecoderConfig | null;
}
interface MP4ClipOpts {
    audio?: boolean | {
        volume: number;
    };
    __unsafe_hardwareAcceleration__?: HardwarePreference;
}
type ExtMP4Sample = Omit<MP4Sample, "data"> & {
    is_idr: boolean;
    deleted?: boolean;
    data: null | Uint8Array;
};
type ThumbnailTimestampPoptions = {
    timestamps: number[];
};
type ThumbnailOpts = {
    start: number;
    end: number;
    step: number;
};
export declare class MP4Clip implements IClip {
    #private;
    ready: IClip["ready"];
    get meta(): {
        duration: number;
        width: number;
        height: number;
        audioSampleRate: number;
        audioChanCount: number;
    };
    constructor(source: OPFSToolFile | ReadableStream<Uint8Array> | MPClipCloneArgs, opts?: MP4ClipOpts);
    tickInterceptor: <T extends Awaited<ReturnType<MP4Clip["tick"]>>>(time: number, tickRet: T) => Promise<T>;
    tick(time: number): Promise<{
        video?: VideoFrame;
        audio: Float32Array[];
        state: "success" | "done";
    }>;
    thumbnails(imgWidth?: number, opts?: Partial<ThumbnailOpts>): Promise<Array<{
        ts: number;
        img: Blob;
    }>>;
    thumbnailsList(imgWidth?: number, opts?: Partial<ThumbnailTimestampPoptions>): Promise<Array<{
        ts: number;
        img: Blob;
    }>>;
    destroy(): void;
}
declare function parseMP4Stream(source: ReadableStream<Uint8Array>, opts?: MP4ClipOpts): Promise<{
    videoSamples: ExtMP4Sample[];
    audioSamples: ExtMP4Sample[];
    decoderConf: MP4DecoderConf;
}>;
export {};
