import { State, ITrack } from '@designcombo/types';

interface ItemsPayload {
    trackItems: any[];
    tracks: ITrack[];
}
interface ItemsOptions {
    trackIndex?: number;
}
export declare function addItems(state: State, payload: ItemsPayload, options?: ItemsOptions): Promise<Partial<State>>;
export {};
