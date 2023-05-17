import { AnyObject, UnknownObject } from '@jovotech/common';
import { Jovo } from './Jovo';
import { PluginConfig } from './Plugin';
export interface Data extends AnyObject {
}
export interface AppData extends Data {
}
export interface RequestData extends Data {
}
export interface ComponentData extends Data {
}
export interface SessionData extends Data {
}
export interface UserData extends Data {
}
export type IntentMap = Partial<Record<string, string>>;
export type JovoConditionFunction = (jovo: Jovo) => boolean | Promise<boolean>;
export type JovoAnyFunction = (jovo: Jovo) => Promise<any>;
export interface StoredElement extends UnknownObject {
    enabled?: boolean;
}
export interface StoredElementSession extends StoredElement {
    expiresAfterSeconds?: number;
}
export interface StoredElementHistory extends StoredElement {
    size?: number;
    asr?: StoredElement | boolean;
    state?: StoredElement | boolean;
    input?: StoredElement | boolean;
    output?: StoredElement | boolean;
    nlu?: StoredElement | boolean;
    request?: StoredElement | boolean;
    response?: StoredElement | boolean;
}
export interface DbPluginConfig extends PluginConfig {
    storedElements?: DbPluginStoredElementsConfig;
}
export interface DbPluginStoredElementsConfig extends UnknownObject {
    user?: StoredElement | boolean;
    session?: StoredElementSession | boolean;
    history?: StoredElementHistory | boolean;
    createdAt?: StoredElement | boolean;
    updateAt?: StoredElement | boolean;
}
