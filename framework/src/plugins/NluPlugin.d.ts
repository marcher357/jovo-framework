import { InterpretationPlugin, InterpretationPluginConfig } from './InterpretationPlugin';
export type NluPluginConfig = InterpretationPluginConfig;
export declare abstract class NluPlugin<CONFIG extends InterpretationPluginConfig = InterpretationPluginConfig> extends InterpretationPlugin<CONFIG> {
    targetSampleRate: undefined;
    processAudio: undefined;
    getDefaultConfig(): CONFIG;
}
