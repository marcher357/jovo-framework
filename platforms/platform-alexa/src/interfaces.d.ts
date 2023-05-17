import { Entity, EnumLike, JovoSession, PartialWhere } from '@jovotech/framework';
import { Intent, Slot } from './output';
export interface Session {
    new: boolean;
    sessionId: string;
    application: Application;
    attributes: JovoSession;
    user: User;
    person: Person;
}
export interface Context {
    System: System;
    Viewport?: Viewport;
    AudioPlayer?: AudioPlayerContext;
    Geolocation?: Geolocation;
}
export type PlayerActivity = 'PLAYING' | 'PAUSED' | 'FINISHED' | 'BUFFER_UNDERRUN' | 'IDLE';
export interface AudioPlayerContext {
    token: string;
    offsetInMilliseconds: number;
    playerActivity: PlayerActivity;
}
export interface Geolocation {
    locationServices?: LocationServices;
    timestamp: string;
    coordinate?: Coordinate;
    altitude?: Altitude;
    heading?: Heading;
    speed?: Speed;
}
export type LocationServicesAccess = 'ENABLED' | 'DISABLED';
export type LocationServicesStatus = 'RUNNING' | 'STOPPED';
export interface LocationServices {
    access: LocationServicesAccess;
    status: LocationServicesStatus;
}
export interface Coordinate {
    latitudeInDegrees: number;
    longitudeInDegrees: number;
    accuracyInMeters: number;
}
export interface Altitude {
    altitudeInMeters?: number;
    accuracyInMeters?: number;
}
export interface Heading {
    directionInDegrees?: number;
    accuracyInDegrees?: number;
}
export interface Speed {
    speedInMetersPerSecond?: number;
    accuracyInMetersPerSecond?: number;
}
export type PermissionStatus = 'DENIED' | 'ACCEPTED' | 'NOT_ANSWERED';
export interface Unit {
    unitId: string;
    persistentUnitId: string;
}
export interface System {
    application: Application;
    user: User;
    person: Person;
    device: Device;
    apiEndpoint: string;
    apiAccessToken: string;
    unit?: Unit;
}
export interface Viewport {
    experiences: Experience[];
    shape: 'RECTANGLE' | 'ROUND';
    pixelWidth: number;
    pixelHeight: number;
    dpi: number;
    currentPixelWidth: number;
    currentPixelHeight: number;
    touch?: TouchMethod[];
    keyboard?: InputMechanism[];
    video?: {
        codecs: string[];
    };
}
export interface Experience {
    arcMinuteWidth: number;
    arcMinuteHeight: number;
    canRotate: boolean;
    canResize: boolean;
}
export type TouchMethod = 'SINGLE';
export type InputMechanism = 'DIRECTION';
export interface AudioPlayerInterface {
}
export interface AlexaPresentationAplInterface {
    runtime: {
        maxVersion: string;
    };
}
export interface AlexaPresentationAplTInterface extends AlexaPresentationAplInterface {
}
export interface AlexaPresentationHtmlInterface extends AlexaPresentationAplInterface {
}
export interface DisplayInterface {
    templateVersion?: string;
    markupVersion?: string;
}
export interface VideoAppInterface {
}
export interface GeolocationInterface {
}
export interface NavigationInterface {
}
export interface Device {
    deviceId: string;
    supportedInterfaces?: {
        'Alexa.Presentation.APL'?: AlexaPresentationAplInterface;
        'AudioPlayer'?: AudioPlayerInterface;
        'Alexa.Presentation.APLT'?: AlexaPresentationAplTInterface;
        'Alexa.Presentation.HTML'?: AlexaPresentationHtmlInterface;
        'Display'?: DisplayInterface;
        'VideoApp'?: VideoAppInterface;
        'Geolocation'?: GeolocationInterface;
        'Navigation'?: NavigationInterface;
    };
}
export interface User {
    userId: string;
    accessToken: string;
    permissions: Permission;
}
export interface Person {
    personId: string;
    accessToken: string;
}
export interface Permission {
    consentToken: string;
}
export interface Application {
    applicationId: string;
}
export interface AlexaEntity extends Entity {
    native: Slot;
}
export declare enum PurchaseResult {
    Accepted = "ACCEPTED",
    Declined = "DECLINED",
    AlreadyPurchased = "ALREADY_PURCHASED",
    Error = "ERROR"
}
export type PurchaseResultLike = EnumLike<PurchaseResult> | string;
export interface Request {
    type: string;
    requestId: string;
    timestamp: string;
    locale: string;
    arguments?: any[];
    token?: string;
    offsetInMilliseconds?: number;
    intent?: PartialWhere<Intent, 'confirmationStatus' | 'slots'>;
    status?: {
        code: string;
        message: string;
    };
    name?: string;
    payload?: {
        purchaseResult?: PurchaseResultLike;
        productId?: string;
        isCardThrown?: boolean;
        permissionScope?: string;
        status?: PermissionStatus;
    };
    error?: {
        type: string;
        message: string;
    };
    cause?: {
        requestId: string;
    };
    originatingRequestId?: string;
    events: any[];
    reason?: string;
    eventCreationTime?: string;
    eventPublishingTime?: string;
    dialogState?: string;
    apiRequest?: {
        name: string;
        arguments: Record<string, string>;
        slots: Record<string, Slot>;
    };
    body?: {
        acceptedPermissions?: {
            scope: string;
        }[];
        acceptedPersonPermissions?: {
            scope: string;
        }[];
        listId?: string;
        listItemIds?: string[];
    };
}
export type ConversationsTarget = 'AMAZON.Conversations' | 'skill';
