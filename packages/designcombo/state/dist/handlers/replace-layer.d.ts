import { State, ITrackItem } from '@designcombo/types';

export declare function replaceLayer(state: State, data: Record<string, ITrackItem>): Promise<Partial<State>>;
