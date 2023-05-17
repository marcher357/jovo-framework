import { JovoResponse } from '@jovotech/output';
import { Image, Representative, RichCard, Suggestion } from './output';
export declare class GoogleBusinessResponse extends JovoResponse {
    [key: string]: unknown;
    messageId: string;
    representative: Representative;
    suggestions?: Suggestion[];
    fallback?: string;
    containsRichText?: boolean;
    text?: string;
    image?: Image;
    richCard?: RichCard;
    hasSessionEnded(): boolean;
}
