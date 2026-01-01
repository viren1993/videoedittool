/// <reference types="dom-webcodecs" />
export declare function concatFloat32Array(bufs: Float32Array[]): Float32Array;
export declare function concatPCMFragments(fragments: Float32Array[][]): Float32Array[];
export declare function extractPCM4AudioData(ad: AudioData): Float32Array[];
export declare function extractPCM4AudioBuffer(ab: AudioBuffer): Float32Array[];
export declare function adjustAudioDataVolume(ad: AudioData, volume: number): AudioData;
export declare function decodeImg(stream: ReadableStream<Uint8Array>, type: string): Promise<VideoFrame[]>;
export declare function mixinPCM(audios: Float32Array[][]): Float32Array;
export declare function audioResample(pcmData: Float32Array[], curRate: number, target: {
    rate: number;
    chanCount: number;
}): Promise<Float32Array[]>;
export declare function sleep(time: number): Promise<void>;
export declare function ringSliceFloat32Array(data: Float32Array, start: number, end: number): Float32Array;
export declare function autoReadStream<ST extends ReadableStream>(stream: ST, cbs: {
    onChunk: ST extends ReadableStream<infer DT> ? (chunk: DT) => Promise<void> : never;
    onDone: () => void;
}): () => void;
export declare function throttle<F extends (...args: any[]) => any>(func: F, wait: number): (...rest: Parameters<F>) => undefined | ReturnType<F>;
export declare function createGoPVideoDecoder(conf: VideoDecoderConfig): {
    decode(chunks: EncodedVideoChunk[], cb: (vf: VideoFrame | null, done: boolean) => void): void;
};
export declare function changePCMPlaybackRate(pcmData: Float32Array, playbackRate: number): Float32Array;
