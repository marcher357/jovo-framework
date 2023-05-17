import { EnumLike } from '@jovotech/framework';
export declare enum ImageSourceSize {
    ExtraSmall = "X_SMALL",
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = "LARGE",
    ExtraLarge = "X_LARGE"
}
export type ImageSourceSizeLike = EnumLike<ImageSourceSize>;
export declare class ImageSource {
    url: string;
    size?: ImageSourceSizeLike;
    widthPixels?: number;
    heightPixels?: number;
}
