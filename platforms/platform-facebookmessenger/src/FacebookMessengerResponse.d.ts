import { JovoResponse } from '@jovotech/output';
import { IdentityData, Message } from './output';
export declare enum MessagingType {
    Response = "RESPONSE",
    Update = "UPDATE",
    MessageTag = "MESSAGE_TAG"
}
export declare enum SenderActionType {
    MarkSeen = "mark_seen",
    TypingOn = "typing_on",
    TypingOff = "typing_off"
}
export declare enum NotificationType {
    Regular = "REGULAR",
    SilentPush = "SILENT_PUSH",
    NoPush = "NO_PUSH"
}
export declare enum MessageTag {
    ConfirmedEventUpdate = "CONFIRMED_EVENT_UPDATE",
    PostPurchaseUpdate = "POST_PURCHASE_UPDATE",
    AccountUpdate = "ACCOUNT_UPDATE",
    HumanAgent = "HUMAN_AGENT"
}
export declare class FacebookMessengerResponse extends JovoResponse {
    [key: string]: unknown;
    messaging_type: MessagingType;
    recipient: IdentityData;
    message?: Message;
    sender_action?: SenderActionType;
    notification_type?: NotificationType;
    tag?: MessageTag;
    hasSessionEnded(): boolean;
}
