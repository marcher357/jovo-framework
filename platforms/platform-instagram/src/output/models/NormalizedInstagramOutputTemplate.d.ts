import { NormalizedPlatformOutputTemplate } from '@jovotech/output';
import { QuickReply, Template } from '@jovotech/platform-facebookmessenger';
import { InstagramOutputTemplateResponse } from './InstagramOutputTemplateResponse';
export declare class NormalizedInstagramOutputTemplate extends NormalizedPlatformOutputTemplate<InstagramOutputTemplateResponse> {
    nativeResponse?: InstagramOutputTemplateResponse;
    nativeQuickReplies?: QuickReply[];
    template?: Template;
}
