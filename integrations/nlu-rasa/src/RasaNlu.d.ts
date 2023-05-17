import { DeepPartial, EntityMap, InterpretationPluginConfig, Jovo, NluData, NluPlugin } from '@jovotech/framework';
import { RasaIntent } from './interfaces';
export interface RasaNluConfig extends InterpretationPluginConfig {
    serverUrl: string;
    serverPath: string;
    alternativeIntents: {
        maxAlternatives: number;
        confidenceCutoff: number;
    };
}
export interface RasaNluData extends NluData {
    intent: {
        name: string;
        confidence: number;
    };
    alternativeIntents: RasaIntent[];
    entities: EntityMap;
}
export type RasaNluInitConfig = DeepPartial<RasaNluConfig>;
export declare class RasaNlu extends NluPlugin<RasaNluConfig> {
    getDefaultConfig(): RasaNluConfig;
    processText(jovo: Jovo, text: string): Promise<RasaNluData | undefined>;
    private sendTextToRasaServer;
    private mapAlternativeIntents;
    private getEntityMapFromResponse;
}
