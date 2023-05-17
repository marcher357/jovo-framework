/// <reference types="node" />
/// <reference types="node" />
import { Stream } from 'stream';
export declare class AudioUtilities {
    static getSamplesFromBase64(base64: string): Float32Array;
    static sampleDown(samples: Float32Array, currentSampleRate: number, newSampleRate: number): Float32Array;
    static encodeSamplesToWav(samples: Float32Array, sampleRate: number): Buffer;
    private static floatTo16BitPCM;
    private static writeUTFBytes;
    static getBase64Audio(stream: Stream): Promise<string | undefined>;
    static buildBase64Uri(data: string, mimeType: string): string;
}
