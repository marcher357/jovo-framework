import { RequestBuilder, UnknownObject } from '@jovotech/framework';
import { FacebookMessengerPlatform, FacebookMessengerRequest } from '.';
export declare class FacebookMessengerRequestBuilder extends RequestBuilder<FacebookMessengerPlatform> {
    launch(json?: UnknownObject): FacebookMessengerRequest;
    intent(name?: string): FacebookMessengerRequest;
    intent(json?: UnknownObject): FacebookMessengerRequest;
}
