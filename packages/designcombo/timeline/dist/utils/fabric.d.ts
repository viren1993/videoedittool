import { Transform, TransformActionHandler } from 'fabric';

/**
 * Checks if transform is centered
 * @param {Object} transform transform data
 * @return {Boolean} true if transform is centered
 */
export declare function isTransformCentered(transform: Transform): boolean;
/**
 * Wrap an action handler with saving/restoring object position on the transform.
 * this is the code that permits to objects to keep their position while transforming.
 * @param {Function} actionHandler the function to wrap
 * @return {Function} a function with an action handler signature
 */
export declare function wrapWithFixedAnchor<T extends Transform>(actionHandler: TransformActionHandler<T>): TransformActionHandler<T>;
