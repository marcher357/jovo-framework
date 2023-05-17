export type MessageValue = string | SpeechMessage | TextMessage;
export declare const IsValidMessageString: () => PropertyDecorator;
export declare class Message {
    speech?: string;
    text?: string;
}
export declare class SpeechMessage extends Message {
    speech: string;
}
export declare class TextMessage extends Message {
    text: string;
}
