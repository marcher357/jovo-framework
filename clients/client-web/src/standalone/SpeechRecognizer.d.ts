/// <reference types="web" />
import { DeepPartial, VoidListener } from '..';
import { EventListenerMap, TypedEventEmitter } from '../utilities/TypedEventEmitter';
export declare enum SpeechRecognizerEvent {
    Start = "start",
    Stop = "stop",
    Abort = "abort",
    StartDetected = "start-detected",
    SpeechRecognized = "speech-recognized",
    SilenceDetected = "silence-detected",
    Timeout = "timeout",
    Error = "error",
    End = "end"
}
export interface SpeechRecognizerEventListenerMap extends EventListenerMap {
    [SpeechRecognizerEvent.End]: (event: SpeechRecognitionEvent | null) => void;
    [SpeechRecognizerEvent.SpeechRecognized]: (event: SpeechRecognitionEvent) => void;
    [SpeechRecognizerEvent.Start]: VoidListener;
    [SpeechRecognizerEvent.Abort]: VoidListener;
    [SpeechRecognizerEvent.StartDetected]: VoidListener;
    [SpeechRecognizerEvent.SilenceDetected]: VoidListener;
    [SpeechRecognizerEvent.Timeout]: VoidListener;
    [SpeechRecognizerEvent.Stop]: VoidListener;
}
export interface SpeechRecognizerDetectionConfig {
    enabled: boolean;
    timeoutInMs: number;
}
export type SpeechRecognitionConfig = Pick<SpeechRecognition, 'continuous' | 'interimResults' | 'lang' | 'maxAlternatives'>;
export interface SpeechRecognizerConfig extends SpeechRecognitionConfig {
    startDetection: SpeechRecognizerDetectionConfig;
    silenceDetection: SpeechRecognizerDetectionConfig;
    grammars: SpeechGrammarList | null;
}
export declare class SpeechRecognizer extends TypedEventEmitter<SpeechRecognizerEventListenerMap> {
    static isSupported(): boolean;
    static getDefaultConfig(): SpeechRecognizerConfig;
    readonly config: SpeechRecognizerConfig;
    private readonly recognition;
    private recording;
    private lastRecognitionEvent;
    private timeoutId?;
    private ignoreNextEnd;
    constructor(config?: DeepPartial<SpeechRecognizerConfig>);
    get isRecording(): boolean;
    get isAvailable(): boolean;
    get startDetectionEnabled(): boolean;
    get silenceDetectionEnabled(): boolean;
    start(): void;
    stop(): void;
    abort(): void;
    private setupSpeechRecognition;
    private scheduleStartDetectionTimeout;
    private scheduleSilenceDetectionTimeout;
    private clearTimeout;
}
