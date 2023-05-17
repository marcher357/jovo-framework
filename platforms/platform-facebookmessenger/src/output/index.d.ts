import { Button, NormalizedFacebookMessengerOutputTemplate, GenericTemplate, GenericTemplateDefaultAction, GenericTemplateElement, Message as FacebookMessengerMessage, QuickReply as FacebookMessengerQuickReply } from './models';
declare module '@jovotech/output/dist/types/models/Card' {
    interface Card {
        buttons?: Button[];
        defaultAction?: GenericTemplateDefaultAction;
        toFacebookMessengerGenericTemplate?(): GenericTemplate;
        toFacebookMessengerGenericTemplateElement?(): GenericTemplateElement;
        toFacebookMessengerMessage?(): FacebookMessengerMessage;
    }
}
declare module '@jovotech/output/dist/types/models/Carousel' {
    interface Carousel {
        toFacebookMessengerGenericTemplate?(): GenericTemplate;
        toFacebookMessengerMessage?(): FacebookMessengerMessage;
    }
}
declare module '@jovotech/output/dist/types/models/Message' {
    interface Message {
        toFacebookMessengerMessage?(): FacebookMessengerMessage;
    }
}
declare module '@jovotech/output/dist/types/models/QuickReply' {
    interface QuickReply {
        toFacebookQuickReply?(): FacebookMessengerQuickReply;
    }
}
declare module '@jovotech/output/dist/types/models/NormalizedOutputTemplatePlatforms' {
    interface NormalizedOutputTemplatePlatforms {
        facebookMessenger?: NormalizedFacebookMessengerOutputTemplate;
    }
}
export * from './decorators/transformation/TransformButton';
export * from './decorators/transformation/TransformTemplate';
export * from './decorators/transformation/TransformQuickReply';
export * from './decorators/validation/CastedMaxLength';
export * from './decorators/validation/IsValidGameMetaDataString';
export * from './models';
export * from './constants';
export * from './FacebookMessengerOutputTemplateConverterStrategy';
export { convertMessageToFacebookMessengerMessage } from './utilities';
