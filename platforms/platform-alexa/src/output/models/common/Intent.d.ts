import { EnumLike } from '@jovotech/framework';
import { Slot } from './Slot';
export declare enum ConfirmationStatus {
    None = "NONE",
    Confirmed = "CONFIRMED",
    Denied = "DENIED"
}
export type ConfirmationStatusLike = EnumLike<ConfirmationStatus>;
export declare class Intent {
    name: string;
    confirmationStatus: ConfirmationStatusLike;
    slots: Record<string, Slot>;
}
