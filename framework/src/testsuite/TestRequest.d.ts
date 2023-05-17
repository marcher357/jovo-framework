import { AudioInput, EntityMap, InputTypeLike, Intent, UnknownObject } from '@jovotech/common';
import { JovoRequest, JovoSession } from '..';
export declare class TestRequest extends JovoRequest {
    isTestRequest: boolean;
    intent: string;
    locale: string;
    session: JovoSession;
    userId: string;
    getLocale(): string | undefined;
    setLocale(locale: string): void;
    getIntent(): string | Intent | undefined;
    setIntent(intent: string): void;
    getEntities(): EntityMap | undefined;
    getInputType(): InputTypeLike | undefined;
    getInputText(): string | undefined;
    getInputAudio(): AudioInput | undefined;
    setSessionData(data: UnknownObject): void;
    getUserId(): string | undefined;
    setUserId(userId: string): void;
    getSessionData(): UnknownObject | undefined;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): string[] | undefined;
}
