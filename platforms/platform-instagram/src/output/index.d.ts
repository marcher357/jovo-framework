import { Message as InstagramMessage } from '@jovotech/output';
import { convertMessageToFacebookMessengerMessage, GenericTemplate, GenericTemplateElement, QuickReply as InstagramQuickReply } from '@jovotech/platform-facebookmessenger';
import { NormalizedInstagramOutputTemplate } from './models';
declare module '@jovotech/output/dist/types/models/Card' {
    interface Card {
        toInstagramGenericTemplate?(): GenericTemplate;
        toInstagramGenericTemplateElement?(): GenericTemplateElement;
        toInstagramMessage?(): InstagramMessage;
    }
}
declare module '@jovotech/output/dist/types/models/Carousel' {
    interface Carousel {
        toInstagramGenericTemplate?(): GenericTemplate;
        toInstagramMessage?(): InstagramMessage;
    }
}
declare module '@jovotech/output/dist/types/models/Message' {
    interface Message {
        toInstagramMessage?(): InstagramMessage;
    }
}
declare module '@jovotech/output/dist/types/models/QuickReply' {
    interface QuickReply {
        toInstagramQuickReply?(): InstagramQuickReply;
    }
}
declare module '@jovotech/output/dist/types/models/NormalizedOutputTemplatePlatforms' {
    interface NormalizedOutputTemplatePlatforms {
        instagram?: NormalizedInstagramOutputTemplate;
    }
}
export * from '@jovotech/platform-facebookmessenger';
export * from './models';
export * from './InstagramOutputTemplateConverterStrategy';
export { convertMessageToFacebookMessengerMessage as convertMessageToInstagramMessage };
