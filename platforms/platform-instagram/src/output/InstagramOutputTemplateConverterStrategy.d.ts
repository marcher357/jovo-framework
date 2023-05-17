import { FacebookMessengerOutputTemplateConverterStrategy } from '@jovotech/platform-facebookmessenger';
import { InstagramResponse } from '../InstagramResponse';
export declare class InstagramOutputTemplateConverterStrategy extends FacebookMessengerOutputTemplateConverterStrategy {
    responseClass: typeof InstagramResponse;
    readonly platformName = "instagram";
}
