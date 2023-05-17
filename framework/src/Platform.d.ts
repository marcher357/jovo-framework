import { AnyObject, Constructor } from '@jovotech/common';
import { JovoResponse, OutputTemplateConverterStrategy } from '@jovotech/output';
import { App, AppMiddlewares, HandleRequest, IntentMap, Jovo, JovoConstructor, JovoUser, RequestBuilder, StoredElementSession } from '.';
import { Extensible, ExtensibleConfig } from './Extensible';
import { JovoDevice, JovoDeviceConstructor } from './JovoDevice';
import { JovoRequest } from './JovoRequest';
import { JovoUserConstructor } from './JovoUser';
import { MiddlewareCollection } from './MiddlewareCollection';
export type PlatformMiddlewares = AppMiddlewares;
export interface PlatformConfig extends ExtensibleConfig {
    intentMap?: IntentMap;
}
export declare abstract class Platform<REQUEST extends JovoRequest = JovoRequest, RESPONSE extends JovoResponse = JovoResponse, JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any, USER extends JovoUser<JOVO> = JovoUser<JOVO>, DEVICE extends JovoDevice<JOVO> = JovoDevice<JOVO>, PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM, CONFIG> = any, CONFIG extends PlatformConfig = PlatformConfig> extends Extensible<CONFIG, PlatformMiddlewares> {
    abstract readonly id: string;
    abstract readonly requestClass: Constructor<REQUEST>;
    abstract readonly jovoClass: JovoConstructor<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM>;
    abstract readonly userClass: JovoUserConstructor<JOVO>;
    abstract readonly deviceClass: JovoDeviceConstructor<JOVO>;
    abstract readonly requestBuilder: Constructor<RequestBuilder<PLATFORM>>;
    abstract outputTemplateConverterStrategy: OutputTemplateConverterStrategy<RESPONSE, any>;
    abstract isRequestRelated(request: REQUEST | AnyObject): boolean;
    abstract isResponseRelated(response: RESPONSE | AnyObject): boolean;
    abstract finalizeResponse(response: RESPONSE | RESPONSE[], jovo: JOVO): RESPONSE | RESPONSE[] | Promise<RESPONSE> | Promise<RESPONSE[]>;
    initializeMiddlewareCollection(): MiddlewareCollection<PlatformMiddlewares>;
    mount(parent: Extensible): void;
    createJovoInstance<APP extends App>(app: APP, handleRequest: HandleRequest): JOVO;
    createRequestInstance(request: REQUEST | AnyObject): REQUEST;
    createUserInstance(jovo: JOVO): USER;
    createDeviceInstance(jovo: JOVO): DEVICE;
    protected enableDatabaseSessionStorage(jovo: Jovo, sessionConfig?: StoredElementSession & {
        enabled?: never;
    }): void;
}
