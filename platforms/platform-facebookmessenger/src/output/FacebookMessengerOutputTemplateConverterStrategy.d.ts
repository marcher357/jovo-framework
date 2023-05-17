import { Carousel, MessageMaxLength, MessageValue, MultipleResponsesOutputTemplateConverterStrategy, NormalizedOutputTemplate, OutputTemplateConverterStrategyConfig, QuickReplyValue } from '@jovotech/output';
import { FacebookMessengerResponse } from '../FacebookMessengerResponse';
import { QuickReply as FacebookMessengerQuickReply } from './models';
export declare class FacebookMessengerOutputTemplateConverterStrategy extends MultipleResponsesOutputTemplateConverterStrategy<FacebookMessengerResponse, OutputTemplateConverterStrategyConfig> {
    responseClass: typeof FacebookMessengerResponse;
    readonly platformName: string;
    protected sanitizeOutput(output: NormalizedOutputTemplate, index?: number): NormalizedOutputTemplate;
    protected sanitizeMessage(message: MessageValue, path: string, maxLength?: MessageMaxLength, offset?: number): MessageValue;
    protected sanitizeCarousel(carousel: Carousel, path: string, minSize?: number, maxSize?: number): Carousel;
    protected sanitizeQuickReplies(quickReplies: QuickReplyValue[], path: string, maxSize?: number, maxLength?: number): QuickReplyValue[];
    convertOutput(output: NormalizedOutputTemplate): FacebookMessengerResponse | FacebookMessengerResponse[];
    convertResponse(response: FacebookMessengerResponse): NormalizedOutputTemplate;
    convertQuickReplyToFacebookMessengerQuickReply(quickReply: QuickReplyValue): FacebookMessengerQuickReply;
}
