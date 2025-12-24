interface StateOptions {
    cors: {
        audio?: boolean;
        video?: boolean;
        image?: boolean;
    };
    acceptsMap: Record<string, string[]>;
}
export declare const setStateOptions: (options: Partial<StateOptions>) => void;
export declare const getStateOptions: () => StateOptions;
export declare const getCorsOptions: () => {
    audio?: boolean;
    video?: boolean;
    image?: boolean;
};
export declare const getAcceptsMap: () => Record<string, string[]>;
export {};
