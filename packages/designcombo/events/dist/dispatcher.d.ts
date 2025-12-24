import { Subject } from 'rxjs';
import { Dispatcher, EventBusData } from './types';

export declare const subject: Subject<EventBusData>, dispatch: Dispatcher;
export { filter } from 'rxjs';
