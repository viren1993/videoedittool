import { ITrackItem } from '@designcombo/types';

export declare const getDimension: (item: ITrackItem, info: {
    width: number;
    height: number;
}) => {
    newWidth: number;
    newHeight: number;
    crop: {
        x: number;
        y: number;
        height: any;
        width: any;
    };
};
export declare const getTimeDuration: (item: ITrackItem, info: {
    duration: number;
}) => {
    duration: number;
    trim: import('@designcombo/types').ITrim | undefined;
    display: import('@designcombo/types').IDisplay;
};
