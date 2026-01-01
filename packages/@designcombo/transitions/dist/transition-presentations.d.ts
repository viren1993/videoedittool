import { JSX } from 'react';
import { SlideDirection } from './presentations';

interface TransitionOptions {
    width: number;
    height: number;
    durationInFrames: number;
    id: string;
    direction?: SlideDirection;
}
export declare const Transitions: Record<string, (options: TransitionOptions) => JSX.Element>;
export {};
