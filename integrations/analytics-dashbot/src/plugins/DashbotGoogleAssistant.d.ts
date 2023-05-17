import { Jovo, JovoRequest, JovoResponse, Platform, UnknownObject } from '@jovotech/framework';
import { DashbotAnalyticsPlugin } from './DashbotAnalyticsPlugin';
export interface DashbotGoogleAssistantRequestLog extends UnknownObject {
    request_body: {
        fulfillmentLib: '@assistant/conversation';
        request: JovoRequest;
    };
}
export interface DashbotGoogleAssistantResponseLog extends DashbotGoogleAssistantRequestLog {
    message?: {
        response: {
            body: JovoResponse;
        };
        fulfillmentLib: '@assistant/conversation';
    };
}
export declare class DashbotGoogleAssistant extends DashbotAnalyticsPlugin {
    readonly id: string;
    trackRequest(jovo: Jovo, url: string): Promise<void>;
    trackResponse(jovo: Jovo, url: string): Promise<void>;
    canHandle(platform: Platform): boolean;
}
