import { Jovo, JovoRequest, JovoResponse, Platform, UnknownObject } from '@jovotech/framework';
import { DashbotAnalyticsPlugin } from './DashbotAnalyticsPlugin';
export interface DashbotAlexaRequestLog extends UnknownObject {
    event: JovoRequest;
}
export interface DashbotAlexaResponseLog extends DashbotAlexaRequestLog {
    response: JovoResponse;
}
export declare class DashbotAlexa extends DashbotAnalyticsPlugin {
    readonly id: string;
    trackRequest(jovo: Jovo, url: string): Promise<void>;
    trackResponse(jovo: Jovo, url: string): Promise<void>;
    canHandle(platform: Platform): boolean;
}
