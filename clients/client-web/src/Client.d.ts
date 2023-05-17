import { Input, PlainObjectType } from '@jovotech/common';
import { NormalizedOutputTemplate } from '@jovotech/output';
import { CoreRequest, CoreResponse, Device } from '@jovotech/platform-core';
import { NetworkTransportStrategy } from './core/NetworkTransportStrategy';
import { OutputProcessor } from './core/OutputProcessor';
import { RecordingModality, RecordingStrategy } from './core/RecordingStrategy';
import { AudioPlayer, AudioPlayerConfig, AudioRecorder, AudioRecorderConfig, DeepPartial, RepromptHandlerConfig, RepromptProcessor, SpeechRecognizer, SpeechRecognizerConfig, SpeechSynthesizer, SpeechSynthesizerConfig, SSMLProcessor, Store, StoreConfig, VoidListener } from './index';
import { EventListenerMap, TypedEventEmitter } from './utilities/TypedEventEmitter';
export type ClientRequest = PlainObjectType<CoreRequest>;
export type ClientResponse = PlainObjectType<CoreResponse>;
export declare enum ClientEvent {
    Request = "request",
    Response = "response",
    Input = "input",
    Output = "output",
    RepromptLimitReached = "reprompt-limit-reached"
}
export interface ClientEventListenerMap extends EventListenerMap {
    [ClientEvent.Request]: (request: ClientRequest) => void;
    [ClientEvent.Response]: (response: ClientResponse) => void;
    [ClientEvent.Input]: (input: Input) => void;
    [ClientEvent.Output]: (output: NormalizedOutputTemplate) => void;
    [ClientEvent.RepromptLimitReached]: VoidListener;
}
export interface InputConfig {
    audioRecorder: AudioRecorderConfig;
    speechRecognizer: SpeechRecognizerConfig;
}
export interface OutputConfig {
    audioPlayer: AudioPlayerConfig;
    speechSynthesizer: SpeechSynthesizerConfig;
    reprompts: RepromptHandlerConfig;
}
export interface Config {
    version: string;
    locale: string;
    platform: string;
    device: Device;
    input: InputConfig;
    output: OutputConfig;
    store: StoreConfig;
}
export interface InitConfig extends DeepPartial<Config> {
    networkTransportStrategy?: NetworkTransportStrategy;
}
export declare class Client extends TypedEventEmitter<ClientEventListenerMap> {
    readonly endpointUrl: string;
    static getDefaultConfig(): Config;
    networkTransportStrategy: NetworkTransportStrategy;
    recordingStrategies: RecordingStrategy<any, any>[];
    currentRecordingModality?: RecordingModality;
    previousRecordingModality?: RecordingModality;
    readonly audioPlayer: AudioPlayer;
    readonly audioRecorder: AudioRecorder;
    readonly outputProcessor: OutputProcessor;
    readonly repromptProcessor: RepromptProcessor;
    readonly ssmlProcessor: SSMLProcessor;
    readonly speechRecognizer: SpeechRecognizer;
    readonly speechSynthesizer: SpeechSynthesizer;
    readonly store: Store;
    readonly config: Config;
    private initialized;
    constructor(endpointUrl: string, config?: InitConfig);
    get isInitialized(): boolean;
    get isPlayingAudio(): boolean;
    get isRecordingInput(): boolean;
    /**
     * Should be called synchronously in a click-handler!
     */
    initialize(): Promise<void>;
    startRecording(modality?: RecordingModality): Promise<void>;
    stopRecording(): void;
    abortRecording(): void;
    createRequest(input: Input): ClientRequest;
    send(inputOrRequest: Input | ClientRequest): Promise<ClientResponse>;
    setRecordingModality(modality: RecordingModality | undefined): void;
    protected handleResponse(response: ClientResponse): Promise<void>;
    private getRelatedRecordingStrategy;
}
