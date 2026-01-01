import { TransitionPresentation } from '../types';

export type CustomPresentationProps = {
    width: number;
    height: number;
};
export declare const circle: (props: CustomPresentationProps) => TransitionPresentation<CustomPresentationProps>;
