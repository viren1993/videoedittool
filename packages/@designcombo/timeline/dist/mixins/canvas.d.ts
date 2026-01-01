import { FabricObject } from 'fabric';
import { default as Timeline } from '../timeline';

declare class CanvasMixin {
    private ___eventListeners;
    ___activeObjects: FabricObject[];
    resize(this: Timeline, payload: {
        width?: number;
        height?: number;
    }, { force }?: {
        force?: boolean;
    }): void;
    pauseEventListeners(this: Timeline): void;
    resumeEventListeners(this: Timeline): false | undefined;
    updateCachingActiveObjects(this: Timeline, newObjects: FabricObject[]): void;
}
export default CanvasMixin;
