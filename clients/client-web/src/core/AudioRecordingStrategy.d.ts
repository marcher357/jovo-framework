import { AudioRecordingModality, RecordingModality, RecordingModalityType, RecordingStrategy } from './RecordingStrategy';
export declare class AudioRecordingStrategy extends RecordingStrategy<RecordingModalityType.Audio | 'AUDIO', AudioRecordingModality> {
    readonly type: RecordingModalityType.Audio | 'AUDIO';
    get modality(): AudioRecordingModality | undefined;
    get useSpeechRecognition(): boolean;
    startRecording(modality: AudioRecordingModality): Promise<RecordingModality>;
    stopRecording(): void;
    abortRecording(): void;
    private onSpeechRecognizerEnd;
    private onSpeechRecognizerFinished;
    private onAudioRecorderStop;
    private onAudioRecorderFinished;
    private addAudioRecorderEventListeners;
    private addSpeechRecognizerEventListeners;
    private removeAudioRecorderEventListeners;
    private removeSpeechRecognizerEventListeners;
}
