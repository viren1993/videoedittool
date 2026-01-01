type EventKey = string | symbol;
type EventToolType = Record<EventKey, (...args: any[]) => any>;
export declare class EventTool<T extends EventToolType> {
    #private;
    static forwardEvent<T1 extends EventToolType, T2 extends EventToolType, EvtType extends (keyof T1 | [keyof T1, keyof T2])[]>(from: {
        on: EventTool<T1>["on"];
    }, to: {
        emit: EventTool<T2>["emit"];
    }, evtTypes: EvtType): () => void;
    on: <Type extends keyof T>(type: Type, listener: T[Type]) => (() => void);
    once: <Type extends keyof T>(type: Type, listener: T[Type]) => (() => void);
    emit: <Type extends keyof T>(type: Type, ...args: Type extends string ? T[Type] extends (...args: any[]) => any ? Parameters<T[Type]> : never : never) => void;
    destroy(): void;
}
export {};
