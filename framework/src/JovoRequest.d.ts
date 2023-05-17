import { UnknownObject } from '@jovotech/common';
import { CapabilityType, InputTypeLike, JovoInput } from './index';
import { JovoSession } from './JovoSession';
export declare abstract class JovoRequest {
    [key: string]: unknown;
    abstract getLocale(): string | undefined;
    abstract setLocale(locale: string): void;
    abstract getIntent(): JovoInput['intent'];
    abstract setIntent(intent: string): void;
    abstract getEntities(): JovoInput['entities'];
    abstract getInputType(): InputTypeLike | undefined;
    abstract getInputText(): JovoInput['text'];
    abstract getInputAudio(): JovoInput['audio'];
    getInput(): JovoInput;
    abstract setSessionData(data: Record<string, unknown>): void;
    abstract getUserId(): string | undefined;
    abstract setUserId(userId: string): void;
    abstract getSessionData(): UnknownObject | undefined;
    abstract getSessionId(): string | undefined;
    abstract isNewSession(): boolean | undefined;
    getSession(): Partial<JovoSession> | undefined;
    abstract getDeviceCapabilities(): CapabilityType[] | undefined;
}
