import { Client } from '..';
export declare const TAG_AUDIO = "audio";
export declare const TAG_BREAK = "break";
export declare const SUPPORTED_TAGS: string[];
export declare class SSMLProcessor {
    readonly client: Client;
    constructor(client: Client);
    isPlainText(ssml: string): boolean;
    isSupportedTag(ssml: string): boolean;
    processSSML(ssml: string): Promise<void>;
    removeSSML(ssml: string, keepTags?: string[]): string;
    private processSSMLPart;
    private getTag;
    private getAudioSource;
    private getBreakTime;
    private getSSMLParts;
}
