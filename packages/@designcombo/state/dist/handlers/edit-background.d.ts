import { State } from '@designcombo/types';

interface BackgroundUpdate {
    type?: "color" | "image";
    value: any;
}
export declare function editBackground(state: State, update: BackgroundUpdate): Partial<State>;
export {};
