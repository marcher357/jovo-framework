import { MessageMaxLength, MessageValue, NormalizedOutputTemplate, OutputTemplateConverterStrategyConfig, QuickReplyValue, SingleResponseOutputTemplateConverterStrategy } from '@jovotech/output';
import { DialogflowResponse } from '../DialogflowResponse';
export declare class DialogflowOutputTemplateConverterStrategy extends SingleResponseOutputTemplateConverterStrategy<DialogflowResponse, OutputTemplateConverterStrategyConfig> {
    platformName: "dialogflow";
    responseClass: typeof DialogflowResponse;
    protected sanitizeOutput(output: NormalizedOutputTemplate): NormalizedOutputTemplate;
    protected sanitizeMessage(message: MessageValue, path: string, maxLength?: MessageMaxLength, offset?: number): MessageValue;
    protected sanitizeQuickReplies(quickReplies: QuickReplyValue[], path: string, maxSize?: number, maxLength?: number): QuickReplyValue[];
    toResponse(output: NormalizedOutputTemplate): DialogflowResponse;
    fromResponse(response: DialogflowResponse): NormalizedOutputTemplate;
    convertQuickReplyToDialogflowQuickReply(quickReply: QuickReplyValue): string;
    private convertDynamicEntityToSessionEntityType;
    private convertSessionEntityTypeToDynamicEntity;
}
