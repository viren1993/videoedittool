import { default as React } from 'react';

export interface Animation {
    property: keyof React.CSSProperties | string;
    from: number;
    to: number;
    durationInFrames: number;
    ease: (t: number) => number;
    delay?: number;
}
export interface AnimatedProps {
    animationIn?: Animation | Animation[] | null;
    animationOut?: Animation | Animation[] | null;
    durationInFrames: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    frame: number;
}
export declare const BoxAnim: React.FC<AnimatedProps>;
export declare const combine: (...animations: (Animation | Animation[] | undefined)[]) => Animation[];
export declare const extractTransformations: (transform: string) => {
    translateX: string;
    translateY: string;
    scale: string;
    rotation: string;
    rotateY: string;
};
