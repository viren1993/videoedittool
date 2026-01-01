import { State, ITrackItem } from '@designcombo/types';

export declare function replaceMedia(state: State, data: Record<string, ITrackItem>): Promise<Partial<State>>;
