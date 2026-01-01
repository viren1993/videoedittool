import { ModifiedEvent, TPointerEvent } from 'fabric';
import { default as Timeline } from '../../timeline';

export declare function onObjectMoving(this: Timeline, e: ModifiedEvent<TPointerEvent>): void;
export declare function addGuidelineEvents(timeline: Timeline): void;
export declare function removeGuidelineEvents(timeline: Timeline): void;
