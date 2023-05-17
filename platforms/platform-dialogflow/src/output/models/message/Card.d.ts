import { Card as BaseCard } from '@jovotech/output';
export declare class Card {
    title?: string;
    subtitle?: string;
    image_uri?: string;
    buttons?: Button[];
    toCard?(): BaseCard;
}
export declare class Button {
    text?: string;
    postback?: string;
}
