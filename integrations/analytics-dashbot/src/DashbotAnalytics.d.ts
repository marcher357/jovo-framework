import { AnalyticsPlugin, AnalyticsPluginConfig, Jovo, RequiredOnlyWhere, Platform } from '@jovotech/framework';
export interface DashbotAnalyticsConfig extends AnalyticsPluginConfig {
    apiKey: string;
    enabled?: boolean;
}
export type DashbotAnalyticsInitConfig = RequiredOnlyWhere<DashbotAnalyticsConfig, 'apiKey'>;
export declare class DashbotAnalytics extends AnalyticsPlugin<DashbotAnalyticsConfig> {
    private readonly plugins;
    private initializedPlugin;
    constructor(config: DashbotAnalyticsInitConfig);
    mount(parent: Platform): void;
    getDefaultConfig(): DashbotAnalyticsConfig;
    getInitConfig(): DashbotAnalyticsInitConfig;
    trackRequest(jovo: Jovo): Promise<void>;
    trackResponse(jovo: Jovo): Promise<void>;
}
