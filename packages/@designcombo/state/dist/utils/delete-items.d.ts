import { ITrackItem, ItemStructure } from '@designcombo/types';

export declare function deleteItems(deleteItemIds: string[], availableItemIds: string[], trackItemsMap: Record<string, ITrackItem>, structure: ItemStructure[], updatedTrackItems: Record<string, ITrackItem>, updatedStructure: ItemStructure[]): {
    updatedTrackItems: Record<string, ITrackItem>;
    updatedStructure: ItemStructure[];
};
