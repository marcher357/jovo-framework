import { QuickReplyValue } from '@jovotech/output';
import { QuickReplyBase, QuickReplyContentType } from './QuickReply';
export declare class UserEmailQuickReply extends QuickReplyBase<QuickReplyContentType.UserEmail | 'user_email'> {
    content_type: QuickReplyContentType.UserEmail | 'user_email';
    toQuickReply?(): QuickReplyValue | undefined;
}
