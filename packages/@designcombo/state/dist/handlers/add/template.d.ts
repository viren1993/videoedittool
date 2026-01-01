import { State, ITemplate } from '@designcombo/types';

interface TemplateOptions {
    targetTrackIndex?: number;
    targetTrackId?: string;
    scaleMode?: string;
    scaleAspectRatio?: number;
}
export declare function addTemplate(state: State, payload: ITemplate, options?: TemplateOptions): Promise<Partial<State>>;
export {};
