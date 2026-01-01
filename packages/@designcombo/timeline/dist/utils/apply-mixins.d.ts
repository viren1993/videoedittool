export type Constructor<T = object> = new (...args: any[]) => T;
/***
 * https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
 */
export declare function applyMixins<T extends Constructor, S extends Constructor>(derivedCtor: T, constructors: S[]): T & {
    prototype: InstanceType<T & S>;
};
