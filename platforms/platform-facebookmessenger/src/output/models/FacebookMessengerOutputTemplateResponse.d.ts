import { IdentityData } from './common/IdentityData';
import { FacebookMessengerResponse, MessageTag, MessagingType, NotificationType, SenderActionType } from '../../FacebookMessengerResponse';
import { Message } from './message/Message';
export declare class FacebookMessengerOutputTemplateResponse implements Partial<FacebookMessengerResponse> {
    [key: string]: unknown;
    messaging_type?: MessagingType;
    recipient?: IdentityData;
    message?: Message;
    sender_action?: SenderActionType;
    notification_type?: NotificationType;
    tag?: MessageTag;
}
