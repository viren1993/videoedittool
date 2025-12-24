import { FC, PropsWithChildren } from 'react';
import { AbsoluteFillLayout, LayoutAndStyle, SequencePropsWithoutDuration } from 'remotion';
import { NoReactInternals } from 'remotion/no-react';
import { TransitionSeriesTransitionProps } from './types';

declare const TransitionSeriesTransition: <PresentationProps extends Record<string, unknown>>(_props: TransitionSeriesTransitionProps<PresentationProps>) => null;
type LayoutBasedProps = true extends typeof NoReactInternals.ENABLE_V5_BREAKING_CHANGES ? AbsoluteFillLayout : LayoutAndStyle;
type SeriesSequenceProps = PropsWithChildren<{
    readonly durationInFrames: number;
    readonly offset?: number;
    readonly className?: string;
    /**
     * @deprecated For internal use only
     */
    readonly stack?: string;
} & LayoutBasedProps & Pick<SequencePropsWithoutDuration, "name">>;
declare const SeriesSequence: ({ children }: SeriesSequenceProps) => import("react/jsx-runtime").JSX.Element;
export declare const TransitionSeries: FC<SequencePropsWithoutDuration> & {
    Sequence: typeof SeriesSequence;
    Transition: typeof TransitionSeriesTransition;
};
export {};
