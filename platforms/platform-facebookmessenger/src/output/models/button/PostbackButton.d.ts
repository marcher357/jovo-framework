import { ButtonBase, ButtonType } from './Button';
export declare class PostbackButton extends ButtonBase<ButtonType.Postback | 'postback'> {
    type: ButtonType.Postback | 'postback';
    title: string;
    payload: string;
}
