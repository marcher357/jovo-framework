import { EntityMap, InputTypeLike, JovoInput, JovoRequest, UnknownObject } from '@jovotech/framework';
import { GoogleBusinessCapabilityType } from './GoogleBusinessDevice';
import { Receipt } from './interfaces';
export declare class GoogleBusinessRequest extends JovoRequest {
    agent?: string;
    conversationId?: string;
    customAgentId?: string;
    requestId?: string;
    context?: {
        entryPoint?: 'ENTRY_POINT_UNSPECIFIED' | 'PLACESHEET' | 'MAPS';
        placeId: string;
        userInfo: {
            displayName: string;
            userDeviceLocale?: string;
        };
        resolvedLocale?: string;
    };
    sendTime?: string;
    message?: {
        messageId: string;
        name: string;
        text: string;
        createTime: string;
    };
    suggestionResponse?: {
        message: string;
        postbackData: string;
        createTime: string;
        text: string;
        suggestionType: 'UNKNOWN' | 'ACTION' | 'REPLY';
    };
    userStatus?: {
        isTyping: boolean;
        createTime: string;
    };
    receipts?: {
        receipts: Receipt[];
        createTime: string;
    };
    getLocale(): string | undefined;
    setLocale(locale: string): void;
    getIntent(): JovoInput['intent'];
    setIntent(): void;
    getEntities(): EntityMap | undefined;
    getInputType(): InputTypeLike | undefined;
    getInputText(): JovoInput['text'];
    getInputAudio(): JovoInput['audio'];
    getSessionData(): UnknownObject | undefined;
    setSessionData(): void;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): GoogleBusinessCapabilityType[] | undefined;
    getUserId(): string | undefined;
    setUserId(): void;
}
