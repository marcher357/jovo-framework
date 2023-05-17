import { EnumLike } from '@jovotech/framework';
export declare enum UrlHint {
    Unspecified = "LINK_UNSPECIFIED",
    Amp = "AMP"
}
export type UrlHintLike = EnumLike<UrlHint>;
export declare class OpenUrl {
    url: string;
    hint: UrlHintLike;
}
