/// <reference types="web" />
export declare class AudioHelper {
    static textFromSpeechRecognition(event: SpeechRecognitionEvent): string;
    static mergeChunks(chunks: Float32Array[], chunkLength: number): Float32Array;
    static sampleDown(buffer: Float32Array, recordSampleRate: number, exportSampleRate: number): Float32Array;
    static toWavBlob(samples: Float32Array, sampleRate: number): Blob;
    static encodeWav(samples: Float32Array, sampleRate: number): DataView;
    private static floatTo16BitPCM;
    private static writeUTFBytes;
}
