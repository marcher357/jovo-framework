import { UnknownObject } from '@jovotech/common';
import { DbPluginStoredElementsConfig } from './index';
import { ComponentData, SessionData } from './interfaces';
export interface StateStackItem extends UnknownObject {
    component: string;
    subState?: string;
    data?: ComponentData;
    resolve?: Record<string, string>;
    config?: UnknownObject;
}
export type StateStack = StateStackItem[];
export interface PersistableSessionData {
    id?: string;
    data: SessionData;
    state?: StateStack;
    createdAt?: string;
    updatedAt: string;
}
export declare class JovoSession {
    [key: string]: unknown;
    id?: string;
    data: SessionData;
    state?: StateStack;
    isNew: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<JovoSession>);
    getPersistableData(): PersistableSessionData;
    setPersistableData(data: PersistableSessionData | undefined, config?: DbPluginStoredElementsConfig['session']): this;
}
