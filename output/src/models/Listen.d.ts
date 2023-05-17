import { DynamicEntities } from '..';
export type ListenValue = boolean | Listen;
export declare class Listen {
    entities?: DynamicEntities;
    intents?: string[];
}
