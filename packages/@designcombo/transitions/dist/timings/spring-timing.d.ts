import { SpringConfig } from 'remotion';
import { TransitionTiming } from '../types';

export declare const springTiming: (options?: {
    config?: Partial<SpringConfig>;
    durationInFrames?: number;
    durationRestThreshold?: number;
    reverse?: boolean;
}) => TransitionTiming;
