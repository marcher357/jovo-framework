import { QuickReplyValue } from '@jovotech/output';
import { QuickReplyBase, QuickReplyContentType } from './QuickReply';
export declare class UserPhoneNumberQuickReply extends QuickReplyBase<QuickReplyContentType.UserPhoneNumber | 'user_phone_number'> {
    content_type: QuickReplyContentType.UserPhoneNumber | 'user_phone_number';
    toQuickReply?(): QuickReplyValue | undefined;
}
