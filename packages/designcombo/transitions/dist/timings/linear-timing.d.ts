import { TransitionTiming } from '../types';

/**
 * Creates a linear timing object for managing animations in frame units.
 * @description Provides a mechanism to handle frame-based transitions linearly, optionally incorporating easing functions.
 * @see [Documentation](https://remotion.dev/docs/transitions/timings/lineartiming)
 * @param {Object} fieldsToFetch Configuration options for the linear timing
 * @param {number} fieldsToFetch.durationInFrames Specifies the total duration of the transition in frames
 * @param {((input: number) => number)=} fieldsToFetch.easing Optional easing function to modify the interpolation of values
 * @returns {TransitionTiming} An object representing the timing of the transition, including methods to get duration and progress
 */
export declare const linearTiming: (options: {
    durationInFrames: number;
    easing?: ((input: number) => number) | undefined;
}) => TransitionTiming;
