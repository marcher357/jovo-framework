import { ButtonBase, ButtonType } from './Button';
export declare enum WebViewHeightRatio {
    Compact = "COMPACT",
    Tall = "TALL",
    Full = "FULL"
}
export declare class UrlButton extends ButtonBase<ButtonType.Url | 'web_url'> {
    type: ButtonType.Url | 'web_url';
    title: string;
    url: string;
    webview_height_ratio?: WebViewHeightRatio;
    messenger_extensions?: boolean;
    fallback_url?: string;
    webview_share_button?: string | 'hide';
}
