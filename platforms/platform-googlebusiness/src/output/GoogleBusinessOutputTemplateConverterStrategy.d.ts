import { Card, Carousel, MultipleResponsesOutputTemplateConverterStrategy, NormalizedOutputTemplate, OutputTemplateConverterStrategyConfig, QuickReplyValue } from '@jovotech/output';
import { GoogleBusinessResponse } from '../GoogleBusinessResponse';
import { Suggestion } from './models';
export declare class GoogleBusinessOutputTemplateConverterStrategy extends MultipleResponsesOutputTemplateConverterStrategy<GoogleBusinessResponse, OutputTemplateConverterStrategyConfig> {
    responseClass: typeof GoogleBusinessResponse;
    platformName: "googleBusiness";
    protected sanitizeOutput(output: NormalizedOutputTemplate, index?: number): NormalizedOutputTemplate;
    protected sanitizeCard(card: Card, path: string): Card;
    protected sanitizeQuickReplies(quickReplies: QuickReplyValue[], path: string, maxSize?: number, maxLength?: number): QuickReplyValue[];
    protected sanitizeCarousel(carousel: Carousel, path: string, minSize?: number, maxSize?: number): Carousel;
    convertOutput(output: NormalizedOutputTemplate): GoogleBusinessResponse | GoogleBusinessResponse[];
    convertResponse(response: GoogleBusinessResponse): NormalizedOutputTemplate;
    convertQuickReplyToGoogleBusinessSuggestion(quickReply: QuickReplyValue): Suggestion;
}
