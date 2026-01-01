/// <reference path="../../src/types/mp4box.d.ts" />
import { MP4File, MP4Info, MP4Sample } from "mp4box";
export declare class SampleTransform {
    #private;
    readable: ReadableStream<{
        chunkType: "ready";
        data: {
            info: MP4Info;
            file: MP4File;
        };
    } | {
        chunkType: "samples";
        data: {
            id: number;
            type: "video" | "audio";
            samples: MP4Sample[];
        };
    }>;
    writable: WritableStream<Uint8Array>;
    constructor();
}
