export declare class Base64Converter {
    static blobToBase64(blob: Blob): Promise<string>;
    static base64ToBlob(base64String: string, contentType: string): Promise<Blob>;
    static arrayBufferToBase64(buffer: ArrayBuffer): string;
    static base64ToArrayBuffer(base64String: string): ArrayBuffer;
}
