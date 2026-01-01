import { ITrackItem, ItemStructure } from '@designcombo/types';

export declare function updateStringIds(ids: string[], jsonString: string): string;
export declare function findItemIdsTemplateComposition(structure: ItemStructure[], itemId: string, trackItemsMap: Record<string, ITrackItem>): string[];
