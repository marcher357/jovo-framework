/// <reference types="web" />
import { DeepPartial, VoidListener } from '..';
import { EventListenerMap, TypedEventEmitter } from '../utilities/TypedEventEmitter';
export declare enum SpeechSynthesizerEvent {
    Speak = "speak",
    Pause = "pause",
    Resume = "resume",
    Stop = "stop",
    End = "end",
    Error = "error"
}
export interface SpeechSynthesizerEventListenerMap extends EventListenerMap {
    [SpeechSynthesizerEvent.Speak]: (utterance: SpeechSynthesisUtterance) => void;
    [SpeechSynthesizerEvent.Pause]: VoidListener;
    [SpeechSynthesizerEvent.Resume]: VoidListener;
    [SpeechSynthesizerEvent.Stop]: VoidListener;
    [SpeechSynthesizerEvent.End]: VoidListener;
}
export interface SpeechSynthesizerConfig {
    enabled: boolean;
    language: string;
    voice?: SpeechSynthesisVoice;
}
export declare class SpeechSynthesizer extends TypedEventEmitter<SpeechSynthesizerEventListenerMap> {
    static getDefaultConfig(): SpeechSynthesizerConfig;
    volume: number;
    readonly config: SpeechSynthesizerConfig;
    private readonly synthesis;
    private isSpeakingUtterance;
    constructor(config?: DeepPartial<SpeechSynthesizerConfig>);
    get isAvailable(): boolean;
    get isSpeaking(): boolean;
    get canPause(): boolean;
    get canResume(): boolean;
    get canStop(): boolean;
    resume(): void;
    pause(): void;
    stop(): void;
    speak(utterance: SpeechSynthesisUtterance | string, forceVolume?: boolean): Promise<void>;
}
