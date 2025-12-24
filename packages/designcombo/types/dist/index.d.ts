export type ItemType = "text" | "image" | "video" | "audio" | "helper" | "caption" | "template" | "composition" | "illustration" | "shape" | "rect" | "progressBar" | "progressFrame" | "progressSquare" | "radialAudioBars" | "linealAudioBars" | "waveAudioBars" | "hillAudioBars";
export type ITrackType = "main" | "text" | "image" | "video" | "audio" | "helper" | "caption" | "template" | "composition" | "illustration" | "shape" | "rect" | "progressBar" | "progressSquare" | "progressFrame" | "radialAudioBars" | "linealAudioBars";
export type ITransitionType = "none" | "fade" | "slide" | "wipe" | "flip" | "clockWipe" | "star" | "circle" | "rectangle" | "slidingDoors";
export type IKindHistory = "add" | "remove" | "update" | "replace" | "update:details" | "layer:selection" | "undo" | "design:resize" | "design:load" | "redo" | "add:transition";
export interface ISize {
    width: number;
    height: number;
    type?: string;
    name?: string;
}
export interface IDisplay {
    from: number;
    to: number;
}
export interface ITrim {
    from: number;
    to: number;
}
export interface IBoxShadow {
    color: string;
    x: number;
    y: number;
    blur: number;
}
export interface IMetadata {
    resourceId: string;
    order: number;
}
export interface IBasicAnimation {
    name: string;
    composition: ICompositionAnimation[];
}
export interface ICompositionAnimation {
    property: string;
    from: number;
    to: number;
    durationInFrames: number;
    ease?: (t: number) => number;
    easing: string;
    delay: number;
    details?: {
        fonts: {
            fontFamily: string;
            url: string;
        }[];
    };
    text?: string;
    persist?: boolean;
}
export interface ITransition {
    id: string;
    trackId: string;
    fromId: string;
    toId: string;
    type: string;
    name?: string;
    duration: number;
    preview?: string;
    direction?: any;
    kind: string;
}
export interface ITrack {
    id: string;
    type: ITrackType;
    items: string[];
    metadata?: Partial<IMetadata>;
    accepts?: string[];
    index?: number;
    magnetic?: boolean;
    static?: boolean;
}
export interface ITimelineScaleState {
    unit: number;
    zoom: number;
    segments: number;
    index: number;
}
export interface ITimelineScrollState {
    /**
     * Timeline scroll state by X-axis.
     */
    left: number;
    /**
     * Timeline scroll state by Y-axis.
     */
    top: number;
}
export interface CanvasSpacing {
    left: number;
    right: number;
}
export interface ItemStructure {
    id: string;
    items: string[];
    transitions: string[];
    tracks: ITrack[];
}
interface ICommonDetails {
    width?: number;
    height?: number;
    transform?: string;
    opacity?: number;
    border?: string;
    borderRadius?: number;
    boxShadow?: IBoxShadow;
    top?: number | string;
    left?: number | string;
    borderColor?: string;
    borderWidth?: number;
}
export interface ITrackItemBase {
    id: string;
    name: string;
    type: ItemType;
    preview?: string;
    display: IDisplay;
    duration?: number;
    trim?: ITrim;
    isMain?: boolean;
    animations?: {
        in: IBasicAnimation;
        out: IBasicAnimation;
        loop: IBasicAnimation;
        timed: IBasicAnimation;
    };
    playbackRate?: number;
    modifier?: IDisplay;
    details?: any;
    activeEdit?: boolean;
    metadata: Record<string, any>;
    transitionInfo?: {
        isFrom: boolean;
        isTo: boolean;
        transition: ITransition;
    };
}
export type ITrackItem = IAudio | IImage | IText | IVideo | ICaption | ITemplate | IComposition | IIllustration | IShape | IRect | IProgressBar | IProgressSquare | IProgressFrame | IRadialAudioBars | ILinealAudioBars | IWaveAudioBars | IHillAudioBars;
export interface ICaptionWord {
    end: number;
    start: number;
    word: string;
}
export interface ICaptionDetails extends ICommonDetails {
    skewX: number;
    skewY: number;
    text: string;
    fontSize: number;
    fontFamily: string;
    fontUrl: string;
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
    height: number;
    top: number | string;
    left: number | string;
    border: string;
    wordWrap: "normal" | "break-word";
    wordBreak: "normal" | "break-word" | "break-all";
    WebkitTextStrokeColor: string;
    WebkitTextStrokeWidth: string;
    borderWidth: number;
    borderColor: string;
    boxShadow: {
        color: string;
        x: number;
        y: number;
        blur: number;
    };
    textTransform: "capitalize" | "uppercase" | "lowercase";
    words: ICaptionWord[];
    appearedColor?: string;
    activeColor?: string;
    activeFillColor?: string;
    animation?: string;
    isKeywordColor?: string;
    preservedColorKeyWord?: boolean;
    linesPerCaption?: number;
    wordsPerLine?: string;
    showObject?: string;
}
export interface ITextDetails extends ICommonDetails {
    skewX: number;
    skewY: number;
    text: string;
    fontSize: number;
    fontFamily: string;
    fontUrl: string;
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
    height: number;
    top: number | string;
    left: number | string;
    border: string;
    wordWrap: "normal" | "break-word";
    wordBreak: "normal" | "break-word" | "break-all";
    WebkitTextStrokeColor: string;
    WebkitTextStrokeWidth: string;
    borderWidth: number;
    borderColor: string;
    boxShadow: {
        color: string;
        x: number;
        y: number;
        blur: number;
    };
}
export interface IImageDetails extends ICommonDetails {
    src: string;
    background: string;
    width: number;
    height: number;
    opacity: number;
    transform: string;
    border: string;
    borderRadius: number;
    boxShadow: IBoxShadow;
    top: string;
    left: string;
    transformOrigin: string;
    crop: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    blur: number;
    brightness: number;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    visibility: "visible" | "hidden";
}
export interface IVideoDetails extends ICommonDetails {
    src: string;
    frames?: number;
    background?: string;
    stream?: ReadableStream<Uint8Array>;
    blob?: Blob;
    width: number;
    height: number;
    volume?: number;
    boxShadow?: IBoxShadow;
    transformOrigin?: string;
    crop?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    blur: number;
    brightness: number;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    visibility: "visible" | "hidden";
}
export interface IAudioDetails extends ICommonDetails {
    src: string;
    volume?: number;
}
export interface IIllustrationDetails extends ICommonDetails {
    path: string;
    src: string;
    width: number;
    height: number;
    opacity: number;
    transform: string;
    border: string;
    top: string;
    left: string;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    svgString: string;
    initialSvgString: string;
    visibility: "visible" | "hidden";
    colorMap: Record<string, string>;
}
export interface IShapeDetails extends ICommonDetails {
    path: string;
    src: string;
    width: number;
    height: number;
    opacity: number;
    transform: string;
    border: string;
    top: string;
    left: string;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    visibility: "visible" | "hidden";
    backgroundColor: string;
}
export interface IRectDetails extends ICommonDetails {
    width: number;
    height: number;
    opacity: number;
    transform: string;
    border: string;
    top: string;
    left: string;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    visibility: "visible" | "hidden";
    backgroundColor: string;
    boxShadow: IBoxShadow;
    blur: number;
    brightness: number;
}
export interface IProgressBarDetails extends ICommonDetails {
    width: number;
    height: number;
    top: string;
    left: string;
    backgroundColors: string[];
    border: string;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    opacity: number;
    flipX: boolean;
    flipY: boolean;
    inverted: boolean;
}
export interface IProgressFrameDetails extends ICommonDetails {
    width: number;
    height: number;
    top: string;
    left: string;
    backgroundColors: string[];
    border: string;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    opacity: number;
    flipX: boolean;
    flipY: boolean;
    inverted: boolean;
    barThickness: number;
}
export interface IProgressSquareDetails extends ICommonDetails {
    width: number;
    height: number;
    top: string;
    left: string;
    strokeColors: string[];
    strokeWidth: number;
    inverted: boolean;
    strokeBackground: string;
    flipX: boolean;
    flipY: boolean;
    rotate: string;
    transform: string;
    opacity: number;
}
export interface IRadialAudioBarsDetails extends ICommonDetails {
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
    srcs: string[];
    reproduceAudio: boolean;
    radialBarColor: string;
    audioDatas: any[];
}
export interface ILinealAudioBarsDetails extends ICommonDetails {
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
    srcs: string[];
    reproduceAudio: boolean;
    audioDatas: any[];
    linealBarColor: string;
    backgroundColor: string;
    lineThickness: number;
    gapSize: number;
    roundness: number;
    placement: string | null;
    inverted: boolean;
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
}
export interface IWaveAudioBarsDetails extends ICommonDetails {
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
    srcs: string[];
    reproduceAudio: boolean;
    radialBarColor: string;
    audioDatas: any[];
    offsetPixelSpeed: number;
    lineColor: string | string[];
    lineGap: number;
    topRoundness: number;
    bottomRoundness: number;
    lines: number;
    sections: number;
}
export interface IHillAudioBarsDetails extends ICommonDetails {
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
    srcs: string[];
    reproduceAudio: boolean;
    radialBarColor: string;
    audioDatas: any[];
    strokeColor: string;
    fillColor: string | null;
    strokeWidth: number | null;
    copies: number | null;
    blendMode: string | null;
}
export interface IText extends ITrackItemBase {
    type: "text";
    details: ITextDetails;
}
export interface ICaption extends ITrackItemBase {
    type: "caption";
    details: ICaptionDetails;
}
export interface IImage extends ITrackItemBase {
    type: "image";
    details: IImageDetails;
}
export interface IVideo extends ITrackItemBase {
    type: "video";
    details: IVideoDetails;
}
export interface IAudio extends ITrackItemBase {
    type: "audio";
    details: IAudioDetails;
}
export interface IIllustration extends ITrackItemBase {
    type: "illustration";
    details: IIllustrationDetails;
}
export interface IShape extends ITrackItemBase {
    type: "shape";
    details: IShapeDetails;
}
export interface IRect extends ITrackItemBase {
    type: "rect";
    details: IRectDetails;
}
export interface IProgressBar extends ITrackItemBase {
    type: "progressBar";
    details: IProgressBarDetails;
}
export interface IProgressSquare extends ITrackItemBase {
    type: "progressSquare";
    details: IProgressSquareDetails;
}
export interface IProgressFrame extends ITrackItemBase {
    type: "progressFrame";
    details: IProgressFrameDetails;
}
export interface IRadialAudioBars extends ITrackItemBase {
    type: "radialAudioBars";
    details: IRadialAudioBarsDetails;
}
export interface ILinealAudioBars extends ITrackItemBase {
    type: "linealAudioBars";
    details: ILinealAudioBarsDetails;
}
export interface IWaveAudioBars extends ITrackItemBase {
    type: "waveAudioBars";
    details: IWaveAudioBarsDetails;
}
export interface IHillAudioBars extends ITrackItemBase {
    type: "hillAudioBars";
    details: IHillAudioBarsDetails;
}
export interface IComposition extends ITrackItemBase {
    type: "composition";
    trackItemIds: string[];
    trackItemsMap: Record<string, ITrackItem>;
    tracks: ITrack[];
    size: ISize;
}
export interface ITemplate extends ITrackItemBase {
    type: "template";
    trackItemIds: string[];
    trackItemsMap: Record<string, ITrackItem>;
    transitionsMap: Record<string, ITransition>;
    transitionIds: string[];
    size: ISize;
    tracks: ITrack[];
    structure: ItemStructure[];
}
export interface State {
    tracks: ITrack[];
    trackItemIds: string[];
    trackItemsMap: Record<string, ITrackItem>;
    transitionIds: string[];
    transitionsMap: Record<string, ITransition>;
    scale: ITimelineScaleState;
    duration: number;
    activeIds: string[];
    size: ISize;
    structure: ItemStructure[];
    fps: number;
    background: {
        type: "color" | "image";
        value: string;
    };
}
export interface IDesign {
    id: string | number;
    size: ISize;
    duration?: number;
    fps: number;
    tracks: ITrack[];
    trackItemIds: string[];
    trackItemsMap: Record<string, ITrackItem>;
    transitionIds: string[];
    transitionsMap: Record<string, ITransition>;
    structure?: ItemStructure[];
    background?: {
        type: "color" | "image";
        value: string;
    };
}
export interface IUpdateStateOptions {
    updateHistory?: boolean;
    kind?: IKindHistory;
}
export interface IStateManager {
    getState(): State;
    subscribe(callback: (state: State) => void): void;
    updateState(partialState: Partial<State>, updateHistory?: IUpdateStateOptions): void;
    subscribeToScale: (callback: (v: {
        scale: State["scale"];
    }) => void) => void;
    subscribeToDuration: (callback: (duration: {
        duration: State["duration"];
    }) => void) => void;
    subscribeToActiveIds: (callback: (activeIds: {
        activeIds: State["activeIds"];
    }) => void) => void;
    subscribeToAddOrRemoveItems: (callback: (trackItemIds: {
        trackItemIds: State["trackItemIds"];
    }) => void) => void;
    subscribeToHistory: (callback: (history: {
        tracks: State["tracks"];
        trackItemsMap: State["trackItemsMap"];
        trackItemIds: State["trackItemIds"];
        transitionIds: State["transitionIds"];
        transitionsMap: State["transitionsMap"];
    }) => void) => void;
    subscribeToUpdateTrackItem: (callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
    }) => void) => void;
    subscribeToUpdateItemDetails: (callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
    }) => void) => void;
    subscribeToUpdateTrackItemTiming: (callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
        changedTrimIds?: string[];
        changedDisplayIds?: string[];
    }) => void) => void;
    subscribeToFps: (callback: (fps: {
        fps: State["fps"];
    }) => void) => void;
    subscribeToUpdateAnimations: (callback: (trackItemUpdate: {
        trackItemsMap: State["trackItemsMap"];
        changedAnimationIds?: string[];
    }) => void) => void;
    subscribeToTracks: (callback: (tracksUpdate: {
        tracks: State["tracks"];
        changedTracks: string[];
    }) => void) => void;
    subscribeToState: (callback: (tracksInfo: {
        tracks: State["tracks"];
        trackItemIds: State["trackItemIds"];
        trackItemsMap: State["trackItemsMap"];
        transitionIds: State["transitionIds"];
        transitionsMap: State["transitionsMap"];
        structure: State["structure"];
    }) => void) => void;
}
export interface ITrackItemsMap {
    [id: string]: ITrackItem;
}
export interface IItemsDetailsMap {
    [id: string]: ITrackItem;
}
export interface ItransitionsMap {
    [id: string]: ITransition;
}
export type ITrackItemAndDetails = ITrackItem;
export type IRecordItemAndDetails = Record<string, ITrackItem>;
export interface IBulkAction {
    type: string;
    payload?: any;
}
export {};
