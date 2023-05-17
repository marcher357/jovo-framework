import { Card } from '@jovotech/output';
import { Suggestion } from '../Suggestion';
import { Media } from './Media';
export declare class CardContent {
    title?: string;
    description?: string;
    media?: Media;
    suggestions?: Suggestion[];
    toCard?(): Card;
}
