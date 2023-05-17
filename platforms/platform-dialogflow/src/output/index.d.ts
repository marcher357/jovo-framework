import { Card as DialogflowCard, NormalizedDialogflowOutputTemplate, Text } from './models';
declare module '@jovotech/output/dist/types/models/Card' {
    interface Card {
        toDialogflowCard?(): DialogflowCard;
    }
}
declare module '@jovotech/output/dist/types/models/Message' {
    interface Message {
        toDialogflowText?(): Text;
    }
}
declare module '@jovotech/output/dist/types/models/QuickReply' {
    interface QuickReply {
        toDialogflowQuickReply?(): string;
    }
}
declare module '@jovotech/output/dist/types/models/NormalizedOutputTemplatePlatforms' {
    interface NormalizedOutputTemplatePlatforms {
        dialogflow?: NormalizedDialogflowOutputTemplate;
    }
}
export * from './decorators/validation/EntitySynonymsContainValue';
export * from './decorators/validation/IsValidMessageContentObject';
export * from './decorators/validation/IsValidRbmSuggestionContentObject';
export * from './decorators/validation/IsValidRbmSuggestedActionContentObject';
export * from './decorators/validation/IsValidTelephonySynthesizeSpeechString';
export * from './DialogflowOutputTemplateConverterStrategy';
export * from './models';
export * from './constants';
export { convertMessageToDialogflowText } from './utilities';
