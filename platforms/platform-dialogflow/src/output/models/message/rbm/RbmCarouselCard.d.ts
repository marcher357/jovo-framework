import { EnumLike } from '@jovotech/framework';
import { RbmCardContent } from './RbmCardContent';
export declare enum CardWidth {
    Unspecified = "CARD_WIDTH_UNSPECIFIED",
    Small = "SMALL",
    Medium = "MEDIUM"
}
export type CardWidthLike = EnumLike<CardWidth>;
export declare class RbmCarouselCard {
    card_width: CardWidthLike;
    card_contents: RbmCardContent[];
}
