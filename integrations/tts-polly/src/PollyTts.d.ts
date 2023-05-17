import { PollyClient, PollyClientConfig } from '@aws-sdk/client-polly';
import { TtsPluginConfig, TtsPlugin, Jovo, TtsTextType, TtsData, DeepPartial } from '@jovotech/framework';
export interface PollyTtsConfig extends TtsPluginConfig {
    lexiconNames?: string[];
    voiceId: string;
    sampleRate: string;
    languageCode?: string;
    speechMarkTypes?: string[];
    engine: string;
    libraryConfig?: PollyClientConfig;
}
export type PollyTtsInitConfig = DeepPartial<PollyTtsConfig>;
export declare class PollyTts extends TtsPlugin<PollyTtsConfig> {
    readonly client: PollyClient;
    supportedSsmlTags: string[];
    constructor(config?: PollyTtsInitConfig);
    getDefaultConfig(): PollyTtsConfig;
    getKeyPrefix(): string | undefined;
    processTts(jovo: Jovo, text: string, textType: TtsTextType): Promise<TtsData | undefined>;
}
