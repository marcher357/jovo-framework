import { QuickReplyValue } from '@jovotech/output';
import { QuickReplyBase, QuickReplyContentType } from './QuickReply';
export declare class TextQuickReply extends QuickReplyBase<QuickReplyContentType.Text | 'text'> {
    content_type: QuickReplyContentType.Text | 'text';
    title: string;
    payload: string | number;
    image_url?: string;
    toQuickReply?(): QuickReplyValue | undefined;
}
