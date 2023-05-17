import { DeepPartial, InterpretationPluginConfig, Jovo, NluData, NluPlugin, Platform, UnknownObject } from '@jovotech/framework';
export interface Nlp {
    [key: string]: any;
}
export interface NlpJsEntity {
    start: number;
    end: number;
    len: number;
    levenshtein: number;
    accuracy: number;
    entity: string;
    type: 'enum' | string;
    option: string;
    sourceText: string;
    utteranceText: string;
    alias?: string;
}
export type SetupModelFunction = (parent: Platform, nlp: Nlp) => void | Promise<void>;
export interface NlpjsNluConfig extends InterpretationPluginConfig {
    languageMap: UnknownObject;
    preTrainedModelFilePath: string;
    useModel: boolean;
    modelsPath: string;
    setupModelCallback?: SetupModelFunction;
}
export type NlpjsNluInitConfig = DeepPartial<NlpjsNluConfig> & Pick<NlpjsNluConfig, 'languageMap'>;
export declare class NlpjsNlu extends NluPlugin<NlpjsNluConfig> {
    nlpjs?: Nlp;
    constructor(config: NlpjsNluInitConfig);
    getDefaultConfig(): NlpjsNluConfig;
    initialize(parent: Platform): Promise<void>;
    processText(jovo: Jovo, text: string): Promise<NluData | undefined>;
    private addCorpusFromModelsIn;
}
