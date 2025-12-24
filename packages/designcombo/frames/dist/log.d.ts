export declare const Log: {
    create: (tag: string) => {
        [k: string]: (...args: any[]) => void;
    };
    dump(): Promise<string>;
    debug: (...data: any[]) => void;
    info: (...data: any[]) => void;
    warn: (...data: any[]) => void;
    error: (...data: any[]) => void;
    setLogLevel: <T extends Function>(logfn: T) => void;
};
