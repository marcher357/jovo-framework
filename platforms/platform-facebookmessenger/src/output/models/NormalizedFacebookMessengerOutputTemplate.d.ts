import { NormalizedPlatformOutputTemplate } from '@jovotech/output';
import { FacebookMessengerOutputTemplateResponse } from './FacebookMessengerOutputTemplateResponse';
import { QuickReply } from './quick-reply/QuickReply';
import { Template } from './template/Template';
export declare class NormalizedFacebookMessengerOutputTemplate extends NormalizedPlatformOutputTemplate<FacebookMessengerOutputTemplateResponse> {
    nativeResponse?: FacebookMessengerOutputTemplateResponse;
    nativeQuickReplies?: QuickReply[];
    template?: Template;
}
