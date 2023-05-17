import { AsyncJovo } from '@jovotech/framework';
import type { GaxiosResponse } from 'gaxios';
import { JWTInput } from 'google-auth-library';
import { GoogleBusinessDevice } from './GoogleBusinessDevice';
import { GoogleBusinessPlatform } from './GoogleBusinessPlatform';
import { GoogleBusinessRequest } from './GoogleBusinessRequest';
import { GoogleBusinessResponse } from './GoogleBusinessResponse';
import { GoogleBusinessUser } from './GoogleBusinessUser';
export declare class GoogleBusiness extends AsyncJovo<GoogleBusinessRequest, GoogleBusinessResponse, GoogleBusiness, GoogleBusinessUser, GoogleBusinessDevice, GoogleBusinessPlatform> {
    get conversationId(): string | undefined;
    get serviceAccount(): JWTInput | undefined;
    protected sendResponse(response: GoogleBusinessResponse): Promise<GaxiosResponse<GoogleBusinessResponse>>;
}
