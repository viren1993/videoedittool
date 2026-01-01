import { TPointerEventInfo } from 'fabric';
import { default as Timeline } from '../timeline';

type SizeProps = {
    min: number;
    max: number;
};
type MouseWheelOptions = {
    offsetX?: number;
    offsetY?: number;
    extraMarginX?: number;
    extraMarginY?: number;
} & Partial<SizeProps>;
export declare const makeMouseWheel: (canvas: Timeline, options?: MouseWheelOptions) => (wheelEvent: TPointerEventInfo<WheelEvent>) => void;
export {};
