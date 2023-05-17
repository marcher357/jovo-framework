import { ConfirmationStatusLike } from './Intent';
import { Resolutions } from './Resolutions';
export declare class Slot {
    [key: string]: unknown;
    name: string;
    value: string;
    confirmationStatus: ConfirmationStatusLike;
    resolutions?: Resolutions;
}
