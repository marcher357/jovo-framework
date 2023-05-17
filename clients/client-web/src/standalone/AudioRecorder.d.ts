/// <reference types="web" />
import { DeepPartial, VoidListener } from '..';
import { EventListenerMap, TypedEventEmitter } from '../utilities/TypedEventEmitter';
export interface AudioRecorderResult {
    data: Float32Array;
    sampleRate: number;
}
export interface AudioRecorderProcessingData {
    bufferLength: number;
    data: Uint8Array;
}
export declare enum AudioRecorderEvent {
    Start = "start",
    Processing = "processing",
    StartDetected = "start-detected",
    SilenceDetected = "silenced-detected",
    Timeout = "timeout",
    Abort = "abort",
    Stop = "stop"
}
export interface AudioRecorderEventListenerMap extends EventListenerMap {
    [AudioRecorderEvent.Stop]: (result: AudioRecorderResult) => void;
    [AudioRecorderEvent.Processing]: (data: AudioRecorderProcessingData) => void;
    [AudioRecorderEvent.Start]: VoidListener;
    [AudioRecorderEvent.Abort]: VoidListener;
    [AudioRecorderEvent.StartDetected]: VoidListener;
    [AudioRecorderEvent.SilenceDetected]: VoidListener;
    [AudioRecorderEvent.Timeout]: VoidListener;
}
export interface AudioRecorderDetectionConfig {
    enabled: boolean;
    /** Value between 0 and 1 */
    threshold: number;
    timeoutInMs: number;
}
export interface AudioRecorderAnalyserConfig extends Required<Omit<AnalyserOptions, keyof AudioNodeOptions | 'fftSize'>> {
    bufferSize: number;
}
export interface AudioRecorderConfig {
    sampleRate: number;
    audioConstraints: MediaTrackConstraints;
    analyser: AudioRecorderAnalyserConfig;
    startDetection: AudioRecorderDetectionConfig;
    silenceDetection: AudioRecorderDetectionConfig;
}
export declare class AudioRecorder extends TypedEventEmitter<AudioRecorderEventListenerMap> {
    static getDefaultConfig(): AudioRecorderConfig;
    readonly config: AudioRecorderConfig;
    private readonly audioNodes;
    private audioContext;
    private mediaStream;
    private initialized;
    private recording;
    private recordingStartedAt?;
    private startThresholdPassed;
    private chunks;
    private chunkLength;
    constructor(config?: DeepPartial<AudioRecorderConfig>);
    get isInitialized(): boolean;
    get isRecording(): boolean;
    get startDetectionEnabled(): boolean;
    get silenceDetectionEnabled(): boolean;
    /**
     * Initialize the AudioRecorder. This needs to be called synchronously in a click-event handler for Safari in order to properly work.
     */
    initialize(): void;
    start(): Promise<void>;
    stop(): void;
    abort(): void;
    private startRecording;
    private initializeStartDetection;
    private stopRecording;
    private onTimeout;
    private doProcessing;
    private detectStart;
    private detectSilence;
    private mergeChunks;
    private checkForInitialization;
    private checkForBrowserCompatibility;
    private getUserMediaStream;
}
