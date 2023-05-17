import { EnumLike } from '@jovotech/framework';
import { ButtonTemplate } from './ButtonTemplate';
import { GenericTemplate } from './GenericTemplate';
import { MediaTemplate } from './MediaTemplate';
import { ReceiptTemplate } from './ReceiptTemplate';
export declare enum TemplateType {
    Generic = "generic",
    Button = "button",
    Media = "media",
    Receipt = "receipt"
}
export type TemplateTypeLike = EnumLike<TemplateType>;
export declare class TemplateBase<TYPE extends TemplateTypeLike = TemplateTypeLike> {
    [key: string]: unknown;
    template_type: TYPE;
}
export type Template = ButtonTemplate | GenericTemplate | MediaTemplate | ReceiptTemplate;
