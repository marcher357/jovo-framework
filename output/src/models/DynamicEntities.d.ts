import { EnumLike } from '@jovotech/common';
import { DynamicEntity } from '..';
export declare enum DynamicEntitiesMode {
    Replace = "REPLACE",
    Merge = "MERGE",
    Clear = "CLEAR"
}
export type DynamicEntitiesModeLike = EnumLike<DynamicEntitiesMode>;
export type DynamicEntityMap = Record<string, DynamicEntity>;
export declare class DynamicEntities {
    mode?: DynamicEntitiesModeLike;
    types?: DynamicEntityMap;
}
