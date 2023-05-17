import { CallButton } from './CallButton';
import { GamePlayButton } from './GamePlayButton';
import { UrlButton } from './UrlButton';
import { LogInButton } from './LogInButton';
import { LogOutButton } from './LogOutButton';
import { PostbackButton } from './PostbackButton';
import { EnumLike } from '@jovotech/framework';
export declare enum ButtonType {
    Url = "web_url",
    Postback = "postback",
    Call = "phone_number",
    LogIn = "account_link",
    LogOut = "account_unlink",
    GamePlay = "game_play"
}
export type ButtonTypeLike = EnumLike<ButtonType>;
export declare class ButtonBase<TYPE extends ButtonTypeLike = ButtonTypeLike> {
    [key: string]: unknown;
    type: TYPE;
}
export type Button = CallButton | GamePlayButton | UrlButton | LogInButton | LogOutButton | PostbackButton;
