import { default as React } from 'react';
import { TransitionPresentation } from '../types';

export type SlideDirection = "from-left" | "from-top" | "from-right" | "from-bottom";
export type SlideProps = {
    direction?: SlideDirection;
    exitStyle?: React.CSSProperties;
    enterStyle?: React.CSSProperties;
};
/**
 * Implements a sliding transition for presentation components where the entering slide pushes out the exiting slide based on the specified direction.
 * @see [Documentation](https://remotion.dev/docs/transitions/presentations/slide)
 * @param {SlideProps} [props] Configuration options for the slide transition: includes direction, enterStyle, and exitStyle.
 * @returns {TransitionPresentation<SlideProps>} Returns a transition configuration object including the component and its props.
 */
export declare const slide: (props?: SlideProps) => TransitionPresentation<SlideProps>;
