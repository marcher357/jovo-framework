import { ButtonBase, ButtonType } from './Button';
export declare class CallButton extends ButtonBase<ButtonType.Call | 'phone_number'> {
    type: ButtonType.Call | 'phone_number';
    title: string;
    payload: string;
}
