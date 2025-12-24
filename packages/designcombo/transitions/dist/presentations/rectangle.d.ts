import { TransitionPresentation } from '../types';

export type CustomPresentationProps = {
    width: number;
    height: number;
};
export declare const rectangle: (props: CustomPresentationProps) => TransitionPresentation<CustomPresentationProps>;
