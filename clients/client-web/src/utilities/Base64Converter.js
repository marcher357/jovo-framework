"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Converter = void 0;
class Base64Converter {
    static blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    const base64 = result.split(',')[1];
                    resolve(base64);
                };
                reader.readAsDataURL(blob);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static base64ToBlob(base64String, contentType) {
        return new Promise((resolve, reject) => {
            const byteChars = atob(base64String);
            const byteNumbers = new Array(byteChars.length);
            for (let i = 0, len = byteChars.length; i < len; i++) {
                byteNumbers[i] = byteChars.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            try {
                const blob = new Blob([byteArray], { type: contentType });
                resolve(blob);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    static base64ToArrayBuffer(base64String) {
        const binaryString = atob(base64String);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
exports.Base64Converter = Base64Converter;
//# sourceMappingURL=Base64Converter.js.map