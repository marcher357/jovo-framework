import { Interpretation, Message, SessionState, LexRuntimeV2Client, DialogAction } from '@aws-sdk/client-lex-runtime-v2';
import type { Credentials } from '@aws-sdk/types';
import { AsrData, DeepPartial, EntityMap, InterpretationPluginConfig, Jovo, NluData, ParsedAudioInput, RequiredOnlyWhere, SluPlugin } from '@jovotech/framework';
interface AsrOutput {
    interpretations?: Interpretation[];
    messages?: Message[];
    sessionState?: SessionState;
}
export interface LexNluData extends NluData {
    intent: {
        name: string;
        confidence?: number;
        state?: string;
        confirmationState?: string;
    };
    entities?: EntityMap;
    messages?: Message[];
    sessionState?: {
        dialogAction?: DialogAction;
    };
}
export interface LexSluConfig extends InterpretationPluginConfig {
    bot: {
        id: string;
        aliasId: string;
    };
    credentials: Credentials;
    region: string;
    locale?: string;
    localeMap?: Record<string, string>;
    fallbackLocale: string;
    asr: boolean;
    nlu: boolean;
}
export type LexSluInitConfig = DeepPartial<LexSluConfig> & Pick<LexSluConfig, 'bot' | 'credentials' | 'region'>;
export declare class LexSlu extends SluPlugin<LexSluConfig> {
    targetSampleRate: number;
    readonly supportedLocaleIds: string[];
    readonly client: LexRuntimeV2Client;
    asrOutput: AsrOutput;
    constructor(config: LexSluInitConfig);
    getDefaultConfig(): LexSluConfig;
    getInitConfig(): RequiredOnlyWhere<LexSluConfig, 'credentials' | 'region' | 'bot'>;
    processAudio(jovo: Jovo, audio: ParsedAudioInput): Promise<AsrData | undefined>;
    processText(jovo: Jovo, text: string): Promise<LexNluData | undefined>;
    private getNluDataFromInterpretation;
    private getLocale;
    private extractValue;
}
export {};
