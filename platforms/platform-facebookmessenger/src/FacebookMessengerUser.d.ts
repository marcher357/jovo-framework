import { JovoUser } from '@jovotech/framework';
import { FacebookMessenger } from './FacebookMessenger';
export declare class FacebookMessengerUser extends JovoUser<FacebookMessenger> {
    get id(): string | undefined;
}
