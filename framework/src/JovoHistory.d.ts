import { EntityMap, UnknownObject } from '@jovotech/common';
import { JovoResponse, OutputTemplate } from '@jovotech/output';
import { JovoInput, JovoRequest, Platform } from './index';
import { JovoSession } from './JovoSession';
export interface JovoHistoryItem extends UnknownObject {
    request?: JovoRequest;
    input?: JovoInput;
    state?: JovoSession['$state'];
    entities?: EntityMap;
    output?: OutputTemplate[];
    response?: JovoResponse | JovoResponse[];
}
export interface PersistableHistoryData {
    items: JovoHistoryItem[];
}
export declare class JovoHistory {
    items: JovoHistoryItem[];
    platform: Platform;
    constructor(platform: Platform, items?: JovoHistoryItem[]);
    get prev(): JovoHistoryItem | undefined;
    getPersistableData(): PersistableHistoryData;
    setPersistableData(data?: PersistableHistoryData): this;
}
