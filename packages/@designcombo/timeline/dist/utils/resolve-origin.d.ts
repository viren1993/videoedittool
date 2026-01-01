import { TOriginX, TOriginY } from 'fabric';

/**
 * Resolves origin value relative to center
 * @private
 * @param {TOriginX | TOriginY} originValue originX / originY
 * @returns number
 */
export declare const resolveOrigin: (originValue: TOriginX | TOriginY | number) => number;
