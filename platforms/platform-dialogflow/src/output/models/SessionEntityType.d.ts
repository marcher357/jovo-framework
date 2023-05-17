import { EnumLike } from '@jovotech/framework';
export declare enum EntityOverrideMode {
    Unspecified = "ENTITY_OVERRIDE_MODE_UNSPECIFIED",
    Override = "ENTITY_OVERRIDE_MODE_OVERRIDE",
    Supplement = "ENTITY_OVERRIDE_MODE_SUPPLEMENT"
}
export type EntityOverrideModeLike = EnumLike<EntityOverrideMode>;
export declare class SessionEntityType {
    name: string;
    entity_override_mode: EntityOverrideModeLike;
    entities: Entity[];
}
export declare class Entity {
    value: string;
    synonyms: string[];
}
