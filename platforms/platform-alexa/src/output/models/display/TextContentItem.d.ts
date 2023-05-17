import { EnumLike } from '@jovotech/framework';
export declare enum DisplayTemplateTextContentItemType {
    Plain = "PlainText",
    Rich = "RichText"
}
export type DisplayTemplateTextContentItemTypeLike = EnumLike<DisplayTemplateTextContentItemType>;
export declare class TextContentItem {
    type: DisplayTemplateTextContentItemTypeLike;
    text: string;
}
