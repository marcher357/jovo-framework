import { EnumLike } from '@jovotech/framework';
import { Card as BaseCard } from '@jovotech/output';
import { PermissionScopeLike } from '../../models';
import { CardImage } from './CardImage';
export declare enum CardType {
    Simple = "Simple",
    Standard = "Standard",
    LinkAccount = "LinkAccount",
    AskForPermissionsConsent = "AskForPermissionsConsent"
}
export type CardTypeLike = EnumLike<CardType>;
export declare class Card<TYPE extends CardTypeLike = CardTypeLike> {
    type: TYPE;
    title?: TYPE extends CardType.LinkAccount ? never : string | undefined;
    content?: TYPE extends CardType.Standard | CardType.LinkAccount ? never : string | undefined;
    text?: TYPE extends CardType.Simple | CardType.LinkAccount ? never : string | undefined;
    image?: TYPE extends CardType.Simple | CardType.LinkAccount | CardType.AskForPermissionsConsent ? never : CardImage | undefined;
    permissions?: PermissionScopeLike[];
    toCard?(): BaseCard;
}
