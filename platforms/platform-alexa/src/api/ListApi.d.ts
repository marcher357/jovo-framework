export type ListMetadata = {
    listId: string;
    name: string;
    state: 'active' | 'archived';
    version: number;
    statusMap: {
        URL: string;
        status: 'active' | 'completed';
    };
};
export type ListMetadataResponse = {
    lists: ListMetadata[];
};
export type ListItem = {
    id: string;
    version: number;
    value: string;
    status: 'active' | 'completed';
    createdTime: string;
    updatedTime: string;
    href: string;
};
export type HouseholdListEventBody = {
    listId?: string;
    listItemIds?: string[];
};
export type ListType = 'shopping-list' | 'todo-list';
export declare function getLists(apiEndpoint: string, permissionToken: string): Promise<ListMetadata[]>;
/**
 * Returns the type of the list
 * @param listId List to check
 * @returns the type of the list
 */
export declare function getTypeOfList(listId: string): ListType;
export declare function getListItems(listId: string, itemIds: string[], apiEndpoint: string, permissionToken: string): Promise<ListItem[]>;
export declare function getListItem(listId: string, itemId: string, apiEndpoint: string, permissionToken: string): Promise<ListItem>;
