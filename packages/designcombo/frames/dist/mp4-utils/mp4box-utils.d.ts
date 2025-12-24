/// <reference path="../../src/types/mp4box.d.ts" />
/// <reference types="dom-webcodecs" />
import { AudioTrackOpts, MP4File, MP4Info, VideoTrackOpts } from "mp4box";
export declare function extractFileConfig(file: MP4File, info: MP4Info): {
    videoTrackConf?: VideoTrackOpts | undefined;
    videoDecoderConf?: VideoDecoderConfig | undefined;
    audioTrackConf?: AudioTrackOpts | undefined;
    audioDecoderConf?: AudioDecoderConfig | undefined;
};
export declare function unsafeReleaseMP4BoxFile(file: MP4File): void;
