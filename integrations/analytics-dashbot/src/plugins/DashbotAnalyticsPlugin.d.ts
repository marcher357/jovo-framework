import { Jovo, Platform, UnknownObject } from '@jovotech/framework';
export declare abstract class DashbotAnalyticsPlugin {
    abstract readonly id: string;
    protected sendDashbotRequest(url: string, data: UnknownObject): Promise<void>;
    abstract trackRequest(jovo: Jovo, url: string): Promise<void>;
    abstract trackResponse(jovo: Jovo, url: string): Promise<void>;
    abstract canHandle(platform: Platform): boolean;
}
