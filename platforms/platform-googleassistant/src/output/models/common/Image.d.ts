import { EnumLike } from '@jovotech/framework';
export declare enum ImageFill {
    Unspecified = "UNSPECIFIED",
    Gray = "GRAY",
    White = "WHITE",
    Cropped = "CROPPED"
}
export type ImageFillLike = EnumLike<ImageFill>;
export declare class Image {
    url: string;
    alt: string;
    height?: number;
    width?: number;
}
