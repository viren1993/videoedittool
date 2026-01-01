import { State } from '@designcombo/types';

interface Animations {
    in?: any;
    out?: any;
    loop?: any;
    timed?: any;
}
interface AnimationPayload {
    id: string;
    animations: Animations;
}
export declare function addAnimation(state: State, payload: AnimationPayload): Promise<Partial<State>>;
export {};
