import { QuickReply } from '../quick-reply/QuickReply';
import { MessageAttachment } from './MessageAttachment';
export declare class Message {
    text?: string;
    attachment?: MessageAttachment;
    quick_replies?: QuickReply[];
    metadata?: string;
}
