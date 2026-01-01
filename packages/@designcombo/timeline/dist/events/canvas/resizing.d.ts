import { default as Timeline } from '../../timeline';
import { BasicTransformEvent, FabricObject, FabricObjectProps, ObjectEvents, SerializedObjectProps, TPointerEvent } from 'fabric';

export default function onObjectResizing(this: Timeline, e: BasicTransformEvent<TPointerEvent> & {
    target: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>;
}): void;
export declare function addResizingEvents(timeline: Timeline): void;
export declare function removeResizingEvents(timeline: Timeline): void;
