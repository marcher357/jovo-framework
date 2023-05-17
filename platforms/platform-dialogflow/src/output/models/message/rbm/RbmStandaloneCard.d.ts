import { EnumLike } from '@jovotech/framework';
import { RbmCardContent } from './RbmCardContent';
export declare enum CardOrientation {
    Unspecified = "CARD_ORIENTATION_UNSPECIFIED",
    Horizontal = "HORIZONTAL",
    Vertical = "VERTICAL"
}
export type CardOrientationLike = EnumLike<CardOrientation>;
export declare enum ThumbnailImageAlignment {
    Unspecified = "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED",
    Left = "LEFT",
    Right = "RIGHT"
}
export type ThumbnailImageAlignmentLike = EnumLike<ThumbnailImageAlignment>;
export declare class RbmStandaloneCard {
    card_orientation: CardOrientationLike;
    thumbnail_image_alignment?: ThumbnailImageAlignmentLike;
    card_content: RbmCardContent;
}
