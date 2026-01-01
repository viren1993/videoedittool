import { TransitionPresentation } from '../types';

export type CustomPresentationProps = {
    width: number;
    height: number;
};
export declare const slidingDoors: (props: CustomPresentationProps) => TransitionPresentation<CustomPresentationProps>;
