import { ITrackItem } from '@designcombo/types';

export declare const getImageInfo: (src: string) => Promise<{
    width: number;
    height: number;
}>;
export declare const getAudioInfo: (src: string) => Promise<{
    duration: number;
}>;
export declare const getVideoInfo: (src: string) => Promise<{
    duration: number;
    width: number;
    height: number;
}>;
export declare const getIVideotemInfo: (item: ITrackItem) => Promise<{
    duration: number;
    width: any;
    height: any;
}>;
export declare const getTextInfo: (text: string, styles: any) => number;
