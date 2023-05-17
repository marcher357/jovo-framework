import { EntityMap, InputTypeLike, JovoInput, JovoRequest, UnknownObject } from '@jovotech/framework';
import { GoogleAssistantCapabilityType } from './GoogleAssistantDevice';
import { Context, GoogleAssistantEntity, Handler, Intent } from './interfaces';
import type { Device, Home, Scene, Session, User } from './output';
export declare class GoogleAssistantRequest extends JovoRequest {
    handler?: Handler;
    intent?: Intent;
    scene?: Scene;
    session?: Session;
    user?: User;
    home?: Home;
    device?: Device;
    context?: Context;
    getLocale(): string | undefined;
    setLocale(locale: string): void;
    getIntent(): JovoInput['intent'];
    setIntent(intent: string): void;
    getEntities(): EntityMap<GoogleAssistantEntity> | undefined;
    getInputType(): InputTypeLike | undefined;
    getInputText(): JovoInput['text'];
    getInputAudio(): JovoInput['audio'];
    getSessionData(): UnknownObject | undefined;
    setSessionData(data: UnknownObject): void;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): GoogleAssistantCapabilityType[] | undefined;
    getUserId(): string | undefined;
    setUserId(userId: string): void;
}
