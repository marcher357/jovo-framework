import { NormalizedOutputTemplate } from '@jovotech/output';
import { Client } from '..';
import { RecordingModality } from './RecordingStrategy';
export interface RepromptHandlerConfig {
    enabled: boolean;
    maxAttempts: number;
    resetSessionOnRepromptLimit: boolean;
}
export type RepromptType = NormalizedOutputTemplate['reprompt'];
export declare class RepromptProcessor {
    readonly client: Client;
    get config(): RepromptHandlerConfig;
    static getDefaultConfig(): RepromptHandlerConfig;
    private reprompts;
    private attempts;
    private recordingModality?;
    private timeoutFn;
    private endFn;
    constructor(client: Client);
    private get isUsingSpeechRecognition();
    processReprompts(reprompts: RepromptType[], modality?: RecordingModality): Promise<void>;
    onInputTimeout(): Promise<void>;
    onInputEnd(): void;
    private handleReprompts;
    private handleRepromptLimitReached;
    private startRecording;
    private addInputEventListeners;
    private removeInputEventListeners;
}
