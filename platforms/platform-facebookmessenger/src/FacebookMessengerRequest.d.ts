import { EntityMap, InputTypeLike, JovoInput, JovoRequest, UnknownObject } from '@jovotech/framework';
import { FacebookMessengerCapabilityType } from './FacebookMessengerDevice';
import { MessagingData } from './interfaces';
export declare class FacebookMessengerRequest extends JovoRequest {
    $type: string;
    id?: string;
    time?: number;
    /**
     * Will always be a single-item-array if defined.
     * @link https://developers.facebook.com/docs/messenger-platform/reference/webhook-events#entry
     */
    messaging?: [MessagingData];
    getLocale(): string | undefined;
    setLocale(locale: string): void;
    getIntent(): JovoInput['intent'];
    setIntent(intent: string): void;
    getEntities(): EntityMap | undefined;
    getInputType(): InputTypeLike | undefined;
    getInputText(): JovoInput['text'];
    getInputAudio(): JovoInput['audio'];
    getSessionData(): UnknownObject | undefined;
    setSessionData(): void;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): FacebookMessengerCapabilityType[] | undefined;
    getUserId(): string | undefined;
    setUserId(): void;
}
