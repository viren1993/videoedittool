export type TransitionState = {
    entering: number;
    exiting: number;
    isInTransitionSeries: boolean;
};
/**
 * Gets the progress and direction of a transition with a context() presentation.
 */
export declare const useTransitionProgress: () => TransitionState;
