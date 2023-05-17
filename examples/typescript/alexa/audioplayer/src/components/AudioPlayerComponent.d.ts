import { BaseComponent } from '@jovotech/framework';
export declare class AudioPlayerComponent extends BaseComponent {
    START(): Promise<void>;
    playbackStarted(): void;
    playbackNearlyFinished(): void;
    playbackFailed(): void;
    playbackStopped(): void;
    playbackFinished(): void;
    clearQueue(): void;
    resumeAudio(): Promise<void>;
    END(): Promise<void>;
}
