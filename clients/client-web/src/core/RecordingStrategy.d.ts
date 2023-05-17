import { EnumLike } from '@jovotech/common';
import { Client } from '../Client';
export declare enum RecordingModalityType {
    Audio = "AUDIO"
}
export type RecordingModalityTypeLike = EnumLike<RecordingModalityType>;
export interface RecordingModalityBase<TYPE extends RecordingModalityTypeLike> {
    type: TYPE;
}
export interface AudioRecordingModality extends RecordingModalityBase<RecordingModalityType.Audio | 'AUDIO'> {
    type: RecordingModalityType.Audio | 'AUDIO';
    useSpeechRecognition?: boolean;
}
export type RecordingModality = AudioRecordingModality;
export declare abstract class RecordingStrategy<TYPE extends RecordingModalityTypeLike, MODALITY extends RecordingModalityBase<TYPE>> {
    readonly client: Client;
    constructor(client: Client);
    abstract readonly type: TYPE;
    abstract startRecording(modality: MODALITY): Promise<MODALITY>;
    abstract stopRecording(): void;
    abstract abortRecording(): void;
}
