export type EntityMap = Record<string, Entity>;
export declare class Entity {
    [key: string]: unknown;
    id?: string;
    resolved?: string;
    value?: any;
    native?: any;
}
