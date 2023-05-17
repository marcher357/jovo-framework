import { AnyObject, ExtensibleInitConfig } from '@jovotech/framework';
import { OmitIndex } from '@jovotech/output';
import { FacebookMessengerConfig, FacebookMessengerPlatform } from '@jovotech/platform-facebookmessenger';
import { Instagram } from './Instagram';
import { InstagramDevice } from './InstagramDevice';
import { InstagramRequest } from './InstagramRequest';
import { InstagramUser } from './InstagramUser';
import { InstagramOutputTemplateConverterStrategy } from './output';
export interface InstagramConfig extends Omit<OmitIndex<FacebookMessengerConfig>, 'senderActions'> {
    [key: string]: unknown;
}
export type InstagramInitConfig = ExtensibleInitConfig<InstagramConfig, 'pageAccessToken'>;
export declare class InstagramPlatform extends FacebookMessengerPlatform {
    readonly id: string;
    readonly outputTemplateConverterStrategy: InstagramOutputTemplateConverterStrategy;
    readonly jovoClass: typeof Instagram;
    readonly requestClass: typeof InstagramRequest;
    readonly userClass: typeof InstagramUser;
    readonly deviceClass: typeof InstagramDevice;
    constructor(config: InstagramInitConfig);
    isRequestRelated(request: AnyObject | InstagramRequest): boolean;
    augmentAppHandle(): void;
}
