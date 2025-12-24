import { default as React } from 'react';

export interface Animation {
    property: keyof React.CSSProperties | string;
    from: number;
    to: number;
    durationInFrames: number;
    ease: (t: number) => number;
    delay?: number;
    persist?: boolean;
}
export declare const useAnimation: (animations: Animation[], durationInFrames: number, frame: number, isOut?: boolean, isTimed?: boolean) => React.CSSProperties;
export declare const combineAnimations: (animations: Animation | Animation[] | undefined) => Animation[];
export declare const combine: (...animations: (Animation | Animation[] | undefined)[]) => Animation[];
