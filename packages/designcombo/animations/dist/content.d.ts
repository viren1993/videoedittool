import { default as React } from 'react';
import { Animation } from './Animated';

export interface ContentAnimationsProps {
    animationTimed?: Animation | Animation[] | null;
    durationInFrames: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
    frame: number;
}
export declare const ContentAnim: React.FC<ContentAnimationsProps>;
