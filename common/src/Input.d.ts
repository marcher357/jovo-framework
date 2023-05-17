import { EnumLike, UnknownObject } from '.';
export interface Intent {
    name: string;
    global?: boolean;
}
export interface Entity {
    id?: string;
    resolved?: string;
    value?: any;
    native?: any;
}
export interface EntityMap<ENTITY_TYPE extends Entity = Entity> {
    [key: string]: ENTITY_TYPE | undefined;
}
export interface AsrData extends UnknownObject {
    text?: string;
}
export interface NluData extends UnknownObject {
    intent?: Intent | string;
    entities?: EntityMap;
    native?: any;
}
export declare enum InputType {
    Launch = "LAUNCH",
    End = "END",
    Error = "ERROR",
    Intent = "INTENT",
    Text = "TEXT",
    TranscribedSpeech = "TRANSCRIBED_SPEECH",
    Speech = "SPEECH"
}
export type InputTypeLike = EnumLike<InputType> | string;
export interface AudioInput {
    base64: string;
    sampleRate: number;
}
export interface Input {
    type?: InputTypeLike;
    text?: string;
    audio?: AudioInput;
    asr?: AsrData;
    nlu?: NluData;
    intent?: Intent | string;
    entities?: EntityMap;
}
