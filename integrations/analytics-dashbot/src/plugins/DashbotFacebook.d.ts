import { Jovo, JovoRequest, JovoResponse, Platform, UnknownObject } from '@jovotech/framework';
import { DashbotAnalyticsPlugin } from './DashbotAnalyticsPlugin';
export interface DashbotFacebookRequestLog extends UnknownObject {
    object: 'page';
    entry: [JovoRequest];
}
export interface DashbotFacebookResponseLog extends UnknownObject {
    qs: {
        access_token: string;
    };
    uri: string;
    json: JovoResponse;
    method: 'POST';
}
export declare class DashbotFacebook extends DashbotAnalyticsPlugin {
    readonly id: string;
    trackRequest(jovo: Jovo, url: string): Promise<void>;
    trackResponse(jovo: Jovo, url: string): Promise<void>;
    canHandle(platform: Platform): boolean;
}
