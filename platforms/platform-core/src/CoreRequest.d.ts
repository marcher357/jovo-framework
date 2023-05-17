import { Input, InputTypeLike, JovoInput, JovoRequest, UnknownObject } from '@jovotech/framework';
import { CoreCapabilityType } from './CoreDevice';
import { CoreRequestContext } from './interfaces';
export declare class CoreRequest extends JovoRequest {
    version?: string;
    platform?: 'core' | string;
    id?: string;
    timestamp?: string;
    timeZone?: string;
    locale?: string;
    data?: UnknownObject;
    input?: Input;
    context?: CoreRequestContext;
    getLocale(): string | undefined;
    getIntent(): JovoInput['intent'];
    setIntent(intent: string): void;
    getEntities(): JovoInput['entities'];
    getInputType(): InputTypeLike | undefined;
    getInputText(): JovoInput['text'];
    getInputAudio(): JovoInput['audio'];
    getSessionData(): UnknownObject | undefined;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): CoreCapabilityType[] | undefined;
    setLocale(locale: string): void;
    setSessionData(data: Record<string, unknown>): void;
    getUserId(): string | undefined;
    setUserId(userId: string): void;
}
