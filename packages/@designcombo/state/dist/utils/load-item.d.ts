import { IAudio, IBoxShadow, ICaption, IComposition, IDisplay, IIllustration, IImage, ILinealAudioBars, IProgressBar, IProgressFrame, IProgressSquare, IRadialAudioBars, IRect, IShape, ISize, ITemplate, IText, ITrack, ITrackItem, ITrim, IVideo, IVideoDetails } from '@designcombo/types';

type OptionsType = {
    size: {
        width: number;
        height: number;
    };
    origin: number;
    scaleMode?: string;
    scaleAspectRatio?: number;
};
type TargetSize = {
    width: number;
    height: number;
};
export declare function getTextPosition(options: Partial<OptionsType>, info: TargetSize): {
    top: string;
    left: string;
    transform: string;
};
export declare const loadVideoItem: (layer: ITrackItem & IVideo, options: Partial<OptionsType>) => Promise<{
    trim: ITrim;
    type: string;
    name: string;
    details: IVideoDetails;
    playbackRate: number;
    display: IDisplay;
    duration: number;
    id: string;
    preview?: string;
    isMain?: boolean;
    animations?: {
        in: import('@designcombo/types').IBasicAnimation;
        out: import('@designcombo/types').IBasicAnimation;
        loop: import('@designcombo/types').IBasicAnimation;
        timed: import('@designcombo/types').IBasicAnimation;
    };
    modifier?: IDisplay;
    activeEdit?: boolean;
    metadata: Record<string, any>;
    transitionInfo?: {
        isFrom: boolean;
        isTo: boolean;
        transition: import('@designcombo/types').ITransition;
    };
}>;
export declare const loadAudioItem: (payload: ITrackItem & IAudio) => Promise<{
    id: string;
    name: string;
    type: string;
    display: IDisplay;
    trim: ITrim;
    playbackRate: number;
    details: {
        src: string;
        volume: number;
    };
    metadata: {
        [x: string]: any;
    };
    duration: number;
}>;
export declare const loadProgressBarItem: (payload: ITrackItem & IProgressBar, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: "progressBar";
    type: "progressBar";
    display: IDisplay;
    details: {
        width: number;
        height: number;
        top: string;
        left: string;
        border: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        flipX: boolean;
        flipY: boolean;
        inverted: boolean;
        backgroundColors: string[];
    };
    metadata: {};
}>;
export declare const loadProgressFrameItem: (payload: ITrackItem & IProgressFrame, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: "progressFrame";
    type: "progressFrame";
    display: IDisplay;
    details: {
        width: number;
        height: number;
        top: string;
        left: string;
        border: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        flipX: boolean;
        flipY: boolean;
        inverted: boolean;
        backgroundColors: string[];
        barThickness: number;
    };
    metadata: {};
}>;
export declare const loadRadialAudioBarsItem: (payload: ITrackItem & IRadialAudioBars, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: "radialAudioBars";
    type: "radialAudioBars";
    display: IDisplay;
    details: {
        width: number;
        height: number;
        top: string;
        left: string;
        radialBarColor: string;
        border: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        flipX: boolean;
        flipY: boolean;
    };
    metadata: {};
}>;
export declare const loadProgressSquareItem: (payload: ITrackItem & IProgressSquare, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: "progressSquare";
    type: "progressSquare";
    display: IDisplay;
    details: {
        width: number;
        height: number;
        top: string;
        left: string;
        border: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        strokeColors: string[];
        strokeWidth: number;
        strokeBackground: string;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        transform: string;
    };
    metadata: {};
}>;
export declare const loadLinealAudioBarsItem: (payload: ITrackItem & ILinealAudioBars, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: "linealAudioBars";
    type: "linealAudioBars";
    display: {
        from: number;
        to: number;
    };
    details: {
        width: number;
        height: number;
        top: string;
        left: string;
        border: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        flipX: boolean;
        flipY: boolean;
        inverted: boolean;
        linealBarColor: string;
        lineThickness: number;
        gapSize: number;
        roundness: number;
        placement: string | null;
        strokeColor: string;
        fillColor: string | null;
        strokeWidth: number | null;
        copies: number | null;
        offsetPixelSpeed: number;
        lineColor: string | string[];
        lineGap: number;
        topRoundness: number;
        bottomRoundness: number;
        lines: number;
        sections: number;
    };
    metadata: {};
}>;
export declare const loadTemplateItem: (payload: ITemplate, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    type: string;
    details: {
        transform: any;
        top: any;
        left: any;
        scale: number;
        rotate: any;
        background: any;
        width: number;
        height: number;
        type?: string;
        name?: string;
    };
    trim: IDisplay;
    display: IDisplay;
    activeEdit: boolean;
}>;
export declare const loadCompositionItem: (payload: IComposition, options: {
    size: ISize;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    type: string;
    details: {
        transform: any;
        top: any;
        left: any;
        scale: number;
        rotate: any;
        width: number;
        height: number;
        type?: string;
        name?: string;
    };
    display: IDisplay;
}>;
export declare const loadIllustrationItem: (payload: ITrackItem & IIllustration, options: {
    size?: {
        width: number;
        height: number;
    };
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: string;
    type: "illustration";
    display: IDisplay;
    playbackRate: number;
    details: {
        src: string;
        width: number;
        height: number;
        opacity: number;
        transform: string;
        border: string;
        borderRadius: number;
        top: string;
        left: string;
        borderWidth: number;
        borderColor: string;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        visibility: "hidden" | "visible";
        svgString: string;
        initialSvgString: string;
        colorMap: Record<string, string>;
    };
    metadata: Record<string, any>;
}>;
export declare const loadShapeItem: (payload: ITrackItem & IShape, options: {
    size?: {
        width: number;
        height: number;
    };
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: string;
    type: "shape";
    display: IDisplay;
    playbackRate: number;
    details: {
        src: string;
        width: number;
        height: number;
        opacity: number;
        transform: string;
        border: string;
        borderRadius: number;
        top: string;
        left: string;
        borderWidth: number;
        borderColor: string;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        visibility: "hidden" | "visible";
        backgroundColor: string;
    };
    metadata: Record<string, any>;
}>;
export declare const loadRectItem: (payload: ITrackItem & IRect, options: {
    size?: {
        width: number;
        height: number;
    };
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    name: string;
    type: "rect";
    display: IDisplay;
    playbackRate: number;
    details: {
        width: number;
        height: number;
        opacity: number;
        transform: string;
        border: string;
        borderRadius: number;
        top: string;
        left: string;
        borderWidth: number;
        borderColor: string;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        visibility: "hidden" | "visible";
        backgroundColor: string;
        boxShadow: IBoxShadow;
        blur: number;
        brightness: number;
    };
    metadata: Record<string, any>;
}>;
export declare const loadImageItem: (payload: ITrackItem & IImage, options: {
    origin?: number;
    size?: {
        width: number;
        height: number;
    };
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    id: string;
    type: string;
    name: string;
    display: IDisplay;
    playbackRate: number;
    details: {
        src: string;
        width: number;
        height: number;
        opacity: number;
        transform: string;
        border: string;
        borderRadius: number;
        boxShadow: IBoxShadow;
        top: string;
        left: string;
        borderWidth: number;
        borderColor: string;
        blur: number;
        brightness: number;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        visibility: "hidden" | "visible";
    };
    metadata: Record<string, any>;
}>;
export declare const loadCaptionItem: (trackItem: ITrackItem, options: {
    origin?: number;
    size?: {
        width: number;
        height: number;
    };
}) => Promise<{
    id: string;
    name: string;
    type: string;
    display: IDisplay;
    details: {
        text: string;
        height: number;
        fontUrl: string;
        top: string | number;
        left: string | number;
        borderWidth: number;
        borderColor: string;
        boxShadow: {
            color: string;
            x: number;
            y: number;
            blur: number;
        };
        words: import('@designcombo/types').ICaptionWord[];
        appearedColor: string;
        activeColor: string;
        activeFillColor: string;
        isKeywordColor: string;
        preservedColorKeyWord: boolean;
        linesPerCaption: number;
        wordsPerLine: string;
        skewX: number;
        skewY: number;
        fontSize: number;
        fontFamily: string;
        color: string;
        lineHeight: number | string;
        letterSpacing: number | string;
        fontWeight: number;
        fontStyle: string;
        textDecoration: string;
        textAlign: "center" | "left" | "right";
        wordSpacing: number | string;
        textShadow: string;
        backgroundColor: string;
        opacity: number;
        width: number;
        textTransform: "capitalize" | "uppercase" | "lowercase";
        border: string;
        wordWrap: "normal" | "break-word";
        wordBreak: "normal" | "break-word" | "break-all";
        WebkitTextStrokeColor: string;
        WebkitTextStrokeWidth: string;
        transform?: string;
        borderRadius?: number;
        animation?: string;
        showObject?: string;
    };
    metadata: Record<string, any>;
}>;
export declare const loadTextItem: (payload: ITrackItem & IText, options: {
    origin?: number;
    size?: {
        width: number;
        height: number;
    };
}) => Promise<{
    id: string;
    name: string;
    type: string;
    display: IDisplay;
    details: {
        text: string;
        height: number;
        fontUrl: string;
        top: string | number;
        left: string | number;
        borderWidth: number;
        borderColor: string;
        boxShadow: {
            color: string;
            x: number;
            y: number;
            blur: number;
        };
        skewX: number;
        skewY: number;
        fontSize: number;
        fontFamily: string;
        color: string;
        lineHeight: number | string;
        letterSpacing: number | string;
        fontWeight: number;
        fontStyle: string;
        textDecoration: string;
        textAlign: "center" | "left" | "right";
        wordSpacing: number | string;
        textShadow: string;
        backgroundColor: string;
        opacity: number;
        width: number;
        textTransform: "capitalize" | "uppercase" | "lowercase";
        border: string;
        wordWrap: "normal" | "break-word";
        wordBreak: "normal" | "break-word" | "break-all";
        WebkitTextStrokeColor: string;
        WebkitTextStrokeWidth: string;
        transform?: string;
        borderRadius?: number;
    };
    metadata: {};
}>;
export declare const loadTrackItem: (payload: ITrackItem & (IVideo | IAudio | IImage | IText | ICaption | ITemplate), options?: {
    size?: {
        width: number;
        height: number;
    };
    origin?: number;
    scaleMode?: string;
    scaleAspectRatio?: number;
}) => Promise<{
    trim: ITrim;
    type: string;
    name: string;
    details: IVideoDetails;
    playbackRate: number;
    display: IDisplay;
    duration: number;
    id: string;
    preview?: string;
    isMain?: boolean;
    animations?: {
        in: import('@designcombo/types').IBasicAnimation;
        out: import('@designcombo/types').IBasicAnimation;
        loop: import('@designcombo/types').IBasicAnimation;
        timed: import('@designcombo/types').IBasicAnimation;
    };
    modifier?: IDisplay;
    activeEdit?: boolean;
    metadata: Record<string, any>;
    transitionInfo?: {
        isFrom: boolean;
        isTo: boolean;
        transition: import('@designcombo/types').ITransition;
    };
} | {
    id: string;
    name: string;
    type: string;
    display: IDisplay;
    trim: ITrim;
    playbackRate: number;
    details: {
        src: string;
        volume: number;
    };
    metadata: {
        [x: string]: any;
    };
    duration: number;
} | {
    id: string;
    type: string;
    details: {
        transform: any;
        top: any;
        left: any;
        scale: number;
        rotate: any;
        background: any;
        width: number;
        height: number;
        type?: string;
        name?: string;
    };
    trim: IDisplay;
    display: IDisplay;
    activeEdit: boolean;
} | {
    id: string;
    type: string;
    name: string;
    display: IDisplay;
    playbackRate: number;
    details: {
        src: string;
        width: number;
        height: number;
        opacity: number;
        transform: string;
        border: string;
        borderRadius: number;
        boxShadow: IBoxShadow;
        top: string;
        left: string;
        borderWidth: number;
        borderColor: string;
        blur: number;
        brightness: number;
        flipX: boolean;
        flipY: boolean;
        rotate: string;
        visibility: "hidden" | "visible";
    };
    metadata: Record<string, any>;
} | {
    id: string;
    name: string;
    type: string;
    display: IDisplay;
    details: {
        text: string;
        height: number;
        fontUrl: string;
        top: string | number;
        left: string | number;
        borderWidth: number;
        borderColor: string;
        boxShadow: {
            color: string;
            x: number;
            y: number;
            blur: number;
        };
        skewX: number;
        skewY: number;
        fontSize: number;
        fontFamily: string;
        color: string;
        lineHeight: number | string;
        letterSpacing: number | string;
        fontWeight: number;
        fontStyle: string;
        textDecoration: string;
        textAlign: "center" | "left" | "right";
        wordSpacing: number | string;
        textShadow: string;
        backgroundColor: string;
        opacity: number;
        width: number;
        textTransform: "capitalize" | "uppercase" | "lowercase";
        border: string;
        wordWrap: "normal" | "break-word";
        wordBreak: "normal" | "break-word" | "break-all";
        WebkitTextStrokeColor: string;
        WebkitTextStrokeWidth: string;
        transform?: string;
        borderRadius?: number;
    };
    metadata: {};
}>;
export declare function checkIfItemIsInTrack(tracks: ITrack[], trackItemIds: string[]): boolean;
export declare function checkIfTrackExists(currentTracks: ITrack[], nextTracks: ITrack[]): boolean;
export declare const loadTracks: (tracks?: Partial<ITrack>[], trackItems?: ITrackItem[]) => ITrack[];
export {};
