import { Card, Carousel } from '@jovotech/output';
import { Button, ButtonType } from '../button/Button';
import { WebViewHeightRatio } from '../button/UrlButton';
import { TemplateBase, TemplateType } from './Template';
export declare enum ImageAspectRatio {
    Horizontal = "horizontal",
    Square = "square"
}
export declare class GenericTemplateDefaultAction {
    type: ButtonType.Url | 'web_url';
    url: string;
    webview_height_ratio?: WebViewHeightRatio;
    messenger_extensions?: boolean;
    fallback_url?: string;
    webview_share_button?: string | 'hide';
}
export declare class GenericTemplateElement {
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action?: GenericTemplateDefaultAction;
    buttons?: Button[];
    toCard?(): Card;
}
export declare class GenericTemplate extends TemplateBase<TemplateType.Generic | 'generic'> {
    template_type: TemplateType.Generic | 'generic';
    image_aspect_ratio?: ImageAspectRatio;
    elements: GenericTemplateElement[];
    toCarousel?(): Carousel;
}
