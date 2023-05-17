import { DeepPartial, VoidListener } from '..';
import { EventListenerMap, TypedEventEmitter } from '../utilities/TypedEventEmitter';
export declare enum AudioPlayerEvent {
    Play = "play",
    Pause = "pause",
    Resume = "resume",
    Stop = "stop",
    End = "end",
    Error = "error"
}
export interface AudioPlayerEventListenerMap extends EventListenerMap {
    [AudioPlayerEvent.Play]: (audioSource: string) => void;
    [AudioPlayerEvent.Resume]: VoidListener;
    [AudioPlayerEvent.End]: VoidListener;
    [AudioPlayerEvent.Pause]: VoidListener;
    [AudioPlayerEvent.Stop]: VoidListener;
}
export interface AudioPlayerConfig {
    enabled: boolean;
}
export declare class AudioPlayer extends TypedEventEmitter<AudioPlayerEventListenerMap> {
    static getDefaultConfig(): AudioPlayerConfig;
    readonly config: AudioPlayerConfig;
    private audioVolume;
    private audio;
    private isAudioPlaying;
    private initialized;
    constructor(config?: DeepPartial<AudioPlayerConfig>);
    get isInitialized(): boolean;
    get isPlaying(): boolean;
    get canResume(): boolean;
    get canPause(): boolean;
    get canStop(): boolean;
    get volume(): number;
    set volume(value: number);
    initialize(): void;
    play(audioSource: string, contentType?: string): Promise<void>;
    resume(): void;
    pause(): void;
    stop(): void;
    private checkForInitialization;
}
