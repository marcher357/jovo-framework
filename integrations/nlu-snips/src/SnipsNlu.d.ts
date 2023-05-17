import { Extensible, InterpretationPluginConfig, Jovo, NluData, NluPlugin } from '@jovotech/framework';
import { JovoModelData } from '@jovotech/model';
export interface SnipsNluConfig extends InterpretationPluginConfig {
    serverUrl: string;
    serverPath: string;
    engineId: string;
    fallbackLanguage: string;
    dynamicEntities?: {
        enabled: boolean;
        serverPath: string;
        modelsDirectory?: string;
        models?: Record<string, JovoModelData>;
        passModels?: boolean;
    };
}
export declare class SnipsNlu extends NluPlugin<SnipsNluConfig> {
    mount(parent: Extensible): Promise<void> | void;
    getDefaultConfig(): SnipsNluConfig;
    processText(jovo: Jovo, text: string): Promise<NluData | undefined>;
    /**
     * Used to to signal the parent to store intents in the session data
     * @see https://www.jovo.tech/docs/nlu#intent-scoping
     */
    supportsIntentScoping(): boolean;
    /**
     * Asynchronously trains dynamic entities. Sends the relevant portion of the Jovo langauge model to
     * the Snips NLU server.
     * @param jovo - Current Jovo object
     */
    private trainDynamicEntities;
    private getLocale;
    /**
     * Sends a request to a configured Snips NLU Server
     * @param requestConfig - Request configuration
     */
    private sendRequestToSnips;
}
