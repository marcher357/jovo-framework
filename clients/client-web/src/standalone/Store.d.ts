import { CoreRequestSession, CoreRequestUser } from '@jovotech/platform-core';
import { DeepPartial } from '..';
export type Data = Record<string, any>;
export interface PersistedData {
    user: CoreRequestUser;
    session?: CoreRequestSession;
}
export interface StoreConfig {
    storageKey: string;
    shouldPersistSession: boolean;
    sessionExpirationInSeconds: number;
}
export declare class Store {
    static getDefaultConfig(): StoreConfig;
    readonly config: StoreConfig;
    data: Data;
    sessionData: CoreRequestSession;
    userData: CoreRequestUser;
    constructor(config?: DeepPartial<StoreConfig>);
    resetSession(): void;
    load(): void;
    save(): void;
    private newSessionData;
}
