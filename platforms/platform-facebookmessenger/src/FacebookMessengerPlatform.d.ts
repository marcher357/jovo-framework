import { AnyObject, AxiosResponse, Extensible, ExtensibleInitConfig, HandleRequest, Jovo, Platform, PlatformConfig, StoredElementSession, UnknownObject } from '@jovotech/framework';
import { LATEST_FACEBOOK_API_VERSION } from './constants';
import { FacebookMessenger } from './FacebookMessenger';
import { FacebookMessengerDevice } from './FacebookMessengerDevice';
import { FacebookMessengerRequest } from './FacebookMessengerRequest';
import { FacebookMessengerRequestBuilder } from './FacebookMessengerRequestBuilder';
import { FacebookMessengerResponse } from './FacebookMessengerResponse';
import { FacebookMessengerUser } from './FacebookMessengerUser';
import { FacebookMessengerOutputTemplateConverterStrategy } from './output';
export interface FacebookMessengerConfig extends PlatformConfig {
    version: typeof LATEST_FACEBOOK_API_VERSION | string;
    verifyToken: string;
    pageAccessToken: string;
    senderActions?: {
        markSeen?: boolean;
        typingIndicator?: boolean;
    };
    session?: StoredElementSession & {
        enabled?: never;
    };
}
export type FacebookMessengerInitConfig = ExtensibleInitConfig<FacebookMessengerConfig, 'pageAccessToken'>;
export declare class FacebookMessengerPlatform extends Platform<FacebookMessengerRequest, FacebookMessengerResponse, FacebookMessenger, FacebookMessengerUser, FacebookMessengerDevice, FacebookMessengerPlatform, FacebookMessengerConfig> {
    readonly id: string;
    readonly outputTemplateConverterStrategy: FacebookMessengerOutputTemplateConverterStrategy;
    readonly requestClass: typeof FacebookMessengerRequest;
    readonly jovoClass: typeof FacebookMessenger;
    readonly userClass: typeof FacebookMessengerUser;
    readonly deviceClass: typeof FacebookMessengerDevice;
    readonly requestBuilder: typeof FacebookMessengerRequestBuilder;
    get apiVersion(): string;
    get pageAccessToken(): string;
    get endpoint(): string;
    constructor(config: FacebookMessengerInitConfig);
    initialize(parent: Extensible): Promise<void>;
    mount(parent: HandleRequest): Promise<void> | void;
    getDefaultConfig(): FacebookMessengerConfig;
    getInitConfig(): FacebookMessengerInitConfig;
    ignoreOwnSenderId(jovo: Jovo): Promise<void>;
    isRequestRelated(request: AnyObject | FacebookMessengerRequest): boolean;
    isResponseRelated(response: AnyObject | FacebookMessengerResponse): boolean;
    finalizeResponse(response: FacebookMessengerResponse[] | FacebookMessengerResponse, jovo: FacebookMessenger): FacebookMessengerResponse[] | Promise<FacebookMessengerResponse> | Promise<FacebookMessengerResponse[]> | FacebookMessengerResponse;
    augmentAppHandle(): void;
    /**
     * Sends data to the Facebook Messenger API
     * @param data - Data to be sent
     */
    sendData<RESPONSE extends AnyObject>(data: UnknownObject): Promise<AxiosResponse<RESPONSE>>;
    private markAsSeen;
    private enableTypingIndicator;
    private disableTypingIndicator;
    private sendSenderAction;
}
