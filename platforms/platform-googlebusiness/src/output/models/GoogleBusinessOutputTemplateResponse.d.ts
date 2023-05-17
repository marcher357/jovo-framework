import { GoogleBusinessResponse } from '../../GoogleBusinessResponse';
import { Image } from './Image';
import { Representative } from './Representative';
import { RichCard } from './RichCard';
import { Suggestion } from './Suggestion';
export declare class GoogleBusinessOutputTemplateResponse implements Partial<GoogleBusinessResponse> {
    [key: string]: unknown;
    name?: string;
    messageId?: string;
    representative?: Representative;
    suggestions?: Suggestion[];
    fallback?: string;
    containsRichText?: boolean;
    text?: string;
    image?: Image;
    richCard?: RichCard;
}
