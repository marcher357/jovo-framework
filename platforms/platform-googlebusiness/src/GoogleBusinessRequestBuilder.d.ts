import { RequestBuilder, UnknownObject } from '@jovotech/framework';
import { GoogleBusinessPlatform } from './GoogleBusinessPlatform';
import { GoogleBusinessRequest } from './GoogleBusinessRequest';
export declare class GoogleBusinessRequestBuilder extends RequestBuilder<GoogleBusinessPlatform> {
    launch(json?: UnknownObject): GoogleBusinessRequest;
    intent(name?: string): GoogleBusinessRequest;
    intent(json?: UnknownObject): GoogleBusinessRequest;
}
