import { JovoUser } from '@jovotech/framework';
import { GoogleBusiness } from './GoogleBusiness';
export declare class GoogleBusinessUser extends JovoUser<GoogleBusiness> {
    get id(): string | undefined;
}
