import { ModifiedEvent, TPointerEvent } from 'fabric';
import { default as Timeline } from '../../timeline';

export declare function onMouseUpForScroll(): void;
export declare function scrollOnMovingForScroll(this: Timeline, e: ModifiedEvent<TPointerEvent>): void;
export declare function addScrollEvents(timeline: Timeline): void;
export declare function removeScrollEvents(timeline: Timeline): void;
