import { Card } from './Card';
import { Carousel } from './Carousel';
import { ListenValue } from './Listen';
import { MessageValue } from './Message';
import { QuickReplyValue } from './QuickReply';
export type AllowNull<T> = {
    [P in keyof T]: T[P] | null;
};
export type NullableOutputTemplateBase = AllowNull<OutputTemplateBase>;
export declare class OutputTemplateBase {
    [key: string]: unknown;
    message?: MessageValue;
    reprompt?: MessageValue;
    listen?: ListenValue;
    quickReplies?: QuickReplyValue[];
    card?: Card;
    carousel?: Carousel;
}
