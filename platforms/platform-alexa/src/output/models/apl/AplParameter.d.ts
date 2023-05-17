import { AnyObject, EnumLike } from '@jovotech/framework';
export declare enum AplType {
    Any = "any",
    Array = "array",
    Boolean = "boolean",
    Color = "color",
    Component = "component",
    Dimension = "dimension",
    Integer = "integer",
    Map = "map",
    Number = "number",
    Object = "object",
    String = "string"
}
export type AplTypeLike = EnumLike<AplType>;
export declare class AplParameter {
    type?: AplTypeLike;
    name: string;
    default?: AnyObject;
    description?: string;
}
