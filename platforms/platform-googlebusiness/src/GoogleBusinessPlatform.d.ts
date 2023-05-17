import { AnyObject, Extensible, ExtensibleInitConfig, Platform, PlatformConfig, StoredElementSession } from '@jovotech/framework';
import { JWT, JWTInput } from 'google-auth-library';
import { GoogleBusiness } from './GoogleBusiness';
import { GoogleBusinessDevice } from './GoogleBusinessDevice';
import { GoogleBusinessRequest } from './GoogleBusinessRequest';
import { GoogleBusinessRequestBuilder } from './GoogleBusinessRequestBuilder';
import { GoogleBusinessResponse } from './GoogleBusinessResponse';
import { GoogleBusinessUser } from './GoogleBusinessUser';
import { GoogleBusinessOutputTemplateConverterStrategy } from './output';
export interface GoogleBusinessConfig extends PlatformConfig {
    serviceAccount: JWTInput;
    session?: StoredElementSession & {
        enabled?: never;
    };
}
export type GoogleBusinessInitConfig = ExtensibleInitConfig<GoogleBusinessConfig, 'serviceAccount'>;
export declare class GoogleBusinessPlatform extends Platform<GoogleBusinessRequest, GoogleBusinessResponse, GoogleBusiness, GoogleBusinessUser, GoogleBusinessDevice, GoogleBusinessPlatform, GoogleBusinessConfig> {
    readonly id: string;
    readonly outputTemplateConverterStrategy: GoogleBusinessOutputTemplateConverterStrategy;
    readonly requestClass: typeof GoogleBusinessRequest;
    readonly jovoClass: typeof GoogleBusiness;
    readonly userClass: typeof GoogleBusinessUser;
    readonly deviceClass: typeof GoogleBusinessDevice;
    readonly requestBuilder: typeof GoogleBusinessRequestBuilder;
    readonly jwtClient: JWT;
    constructor(config: GoogleBusinessInitConfig);
    getDefaultConfig(): GoogleBusinessConfig;
    getInitConfig(): GoogleBusinessInitConfig;
    mount(parent: Extensible): Promise<void> | void;
    isRequestRelated(request: AnyObject | GoogleBusinessRequest): boolean;
    isResponseRelated(response: AnyObject | GoogleBusinessResponse): boolean;
    finalizeResponse(response: GoogleBusinessResponse[] | GoogleBusinessResponse, googleBusiness: GoogleBusiness): GoogleBusinessResponse[] | Promise<GoogleBusinessResponse> | Promise<GoogleBusinessResponse[]> | GoogleBusinessResponse;
    private handlePotentialDuplicateMessage;
    private beforeRequestStart;
}
