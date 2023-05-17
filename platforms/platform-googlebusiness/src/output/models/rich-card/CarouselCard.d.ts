import { Carousel } from '@jovotech/output';
import { CardContent } from './CardContent';
export declare enum CardWidth {
    Unspecified = "CARD_WIDTH_UNSPECIFIED",
    Small = "SMALL",
    Medium = "MEDIUM"
}
export declare class CarouselCard {
    cardWidth: CardWidth;
    cardContents: CardContent[];
    toCarousel?(): Carousel;
}
