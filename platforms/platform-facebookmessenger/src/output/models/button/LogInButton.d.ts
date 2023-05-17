import { ButtonBase, ButtonType } from './Button';
export declare class LogInButton extends ButtonBase<ButtonType.LogIn | 'account_link'> {
    type: ButtonType.LogIn | 'account_link';
    url: string;
}
