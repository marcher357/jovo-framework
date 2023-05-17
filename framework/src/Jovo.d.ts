import { DeepPartial, EntityMap, PickWhere, UnknownObject } from '@jovotech/common';
import { JovoResponse, OutputTemplate } from '@jovotech/output';
import { App, AppConfig } from './App';
import { HandleRequest } from './HandleRequest';
import { BaseComponent, BaseOutput, ComponentConfig, ComponentConstructor, ComponentData, DbPluginStoredElementsConfig, I18NextAutoPath, I18NextResourcesLanguageKeys, I18NextResourcesNamespaceKeysOfLanguage, I18NextTFunctionOptions, I18NextTOptions, I18NextValueAt, JovoInput, OutputConstructor, PersistableSessionData, PersistableUserData, Server } from './index';
import { RequestData } from './interfaces';
import { JovoDevice } from './JovoDevice';
import { JovoHistory, JovoHistoryItem, PersistableHistoryData } from './JovoHistory';
import { JovoRequest } from './JovoRequest';
import { JovoSession } from './JovoSession';
import { JovoUser } from './JovoUser';
import { Platform } from './Platform';
import { JovoRoute } from './plugins/RouterPlugin';
export type JovoConstructor<REQUEST extends JovoRequest, RESPONSE extends JovoResponse, JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>, USER extends JovoUser<JOVO>, DEVICE extends JovoDevice<JOVO>, PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>> = new (app: App, handleRequest: HandleRequest, platform: PLATFORM, ...args: unknown[]) => JOVO;
export interface JovoPersistableData {
    user?: PersistableUserData;
    session?: PersistableSessionData;
    history?: PersistableHistoryData;
    createdAt?: string;
    updatedAt?: string;
}
export interface JovoComponentInfo<DATA extends ComponentData = ComponentData, CONFIG extends UnknownObject = UnknownObject> {
    data: DATA;
    config?: CONFIG;
}
export interface DelegateOptions<CONFIG extends UnknownObject | undefined = UnknownObject | undefined, EVENTS extends string = string> {
    resolve: Record<EVENTS, string | ((this: BaseComponent, ...args: any[]) => any)>;
    config?: CONFIG;
}
export declare function registerPlatformSpecificJovoReference<KEY extends keyof Jovo, REQUEST extends JovoRequest, RESPONSE extends JovoResponse, JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>, USER extends JovoUser<JOVO>, DEVICE extends JovoDevice<JOVO>, PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>>(key: KEY, jovoClass: JovoConstructor<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>): void;
export declare abstract class Jovo<REQUEST extends JovoRequest = JovoRequest, RESPONSE extends JovoResponse = JovoResponse, JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any, USER extends JovoUser<JOVO> = JovoUser<JOVO>, DEVICE extends JovoDevice<JOVO> = JovoDevice<JOVO>, PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any> {
    readonly $app: App;
    readonly $handleRequest: HandleRequest;
    readonly $platform: PLATFORM;
    $request: REQUEST;
    $input: JovoInput;
    $output: OutputTemplate[];
    $response?: RESPONSE | RESPONSE[];
    $data: RequestData;
    $device: DEVICE;
    $entities: EntityMap;
    $history: JovoHistory;
    $route?: JovoRoute;
    $session: JovoSession;
    $user: USER;
    $cms: UnknownObject;
    constructor($app: App, $handleRequest: HandleRequest, $platform: PLATFORM);
    get $config(): AppConfig;
    get $server(): Server;
    get $plugins(): HandleRequest['plugins'];
    get $state(): JovoSession['state'];
    get $subState(): string | undefined;
    set $subState(value: string | undefined);
    get $component(): JovoComponentInfo;
    $t<PATH extends string, LANGUAGE extends I18NextResourcesLanguageKeys | string = I18NextResourcesLanguageKeys, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string = I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE>>(path: I18NextAutoPath<PATH, LANGUAGE, NAMESPACE> | PATH | Array<I18NextAutoPath<PATH, LANGUAGE, NAMESPACE> | PATH>, options?: I18NextTOptions<LANGUAGE, NAMESPACE>): I18NextValueAt<PATH, LANGUAGE, NAMESPACE>;
    $t<FORCED_RESULT>(path: string | string[], options?: I18NextTFunctionOptions): FORCED_RESULT;
    $send(outputTemplateOrMessage: OutputTemplate | OutputTemplate[] | string): Promise<void>;
    $send<OUTPUT extends BaseOutput>(outputConstructor: OutputConstructor<OUTPUT, REQUEST, RESPONSE, this>, options?: DeepPartial<OUTPUT['options']>): Promise<void>;
    $redirect<COMPONENT extends BaseComponent, HANDLER extends Exclude<keyof PickWhere<COMPONENT, Function>, keyof BaseComponent>>(constructor: ComponentConstructor<COMPONENT>, handler?: HANDLER): Promise<void>;
    $redirect(name: string, handler?: string): Promise<void>;
    $delegate<COMPONENT extends BaseComponent>(constructor: ComponentConstructor<COMPONENT>, options: DelegateOptions<ComponentConfig<COMPONENT>>): Promise<void>;
    $delegate(name: string, options: DelegateOptions): Promise<void>;
    $resolve<ARGS extends unknown[]>(eventName: string, ...eventArgs: ARGS): Promise<void>;
    getSession(): JovoSession;
    getEntityMap(): EntityMap;
    getPersistableData(): JovoPersistableData;
    setPersistableData(data: JovoPersistableData, config?: DbPluginStoredElementsConfig): void;
    getCurrentHistoryItem(): JovoHistoryItem;
    protected getJovoReference(): Jovo;
}
