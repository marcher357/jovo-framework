"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3TtsCache = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const url_join_ts_1 = require("url-join-ts");
const framework_1 = require("@jovotech/framework");
class S3TtsCache extends framework_1.TtsCachePlugin {
    constructor(config) {
        super(config);
        this.client = new client_s3_1.S3Client(Object.assign({}, this.config.libraryConfig));
    }
    get baseUrl() {
        return `https://${this.config.bucket}.s3.amazonaws.com`;
    }
    getInitConfig() {
        return {
            bucket: '<YOUR-BUCKET-NAME>',
            path: '<YOUR-PATH>',
        };
    }
    getDefaultConfig() {
        return {
            bucket: '<YOUR-BUCKET-NAME>',
            path: '<YOUR-PATH>',
            returnEncodedAudio: false,
        };
    }
    async getItem(key, locale, fileExtension) {
        let command;
        const filePath = this.getFilePath(key, locale, fileExtension);
        const fullPath = (0, url_join_ts_1.urlJoin)(this.baseUrl, filePath);
        if (this.config.returnEncodedAudio) {
            command = this.buildGetCommand(filePath);
        }
        else {
            command = this.buildHeadCommand(filePath);
        }
        try {
            const response = await this.client.send(command);
            const body = response.Body;
            if (body) {
                const result = {
                    key,
                    fileExtension,
                    contentType: response.ContentType,
                    url: fullPath,
                    encodedAudio: await framework_1.AudioUtilities.getBase64Audio(body),
                };
                return result;
            }
            if (response.ContentType) {
                return {
                    key,
                    fileExtension,
                    contentType: response.ContentType,
                    url: fullPath,
                };
            }
        }
        catch (error) {
            console.log(error.message);
        }
        // object couldn't be retrieved from cache
        return;
    }
    buildHeadCommand(filePath) {
        const params = {
            Bucket: this.config.bucket,
            Key: filePath,
        };
        const command = new client_s3_1.HeadObjectCommand(params);
        return command;
    }
    buildGetCommand(filePath) {
        const params = {
            Bucket: this.config.bucket,
            Key: filePath,
        };
        const command = new client_s3_1.GetObjectCommand(params);
        return command;
    }
    async storeItem(key, locale, data) {
        if (!data.encodedAudio) {
            return;
        }
        const filePath = this.getFilePath(key, locale, data.fileExtension);
        const fullPath = (0, url_join_ts_1.urlJoin)(this.baseUrl, filePath);
        const body = Buffer.from(data.encodedAudio, 'base64');
        const params = {
            Bucket: this.config.bucket,
            Key: filePath,
            Body: body,
            ContentType: data.contentType,
            ACL: 'public-read',
        };
        const command = new client_s3_1.PutObjectCommand(params);
        try {
            await this.client.send(command);
            return fullPath;
        }
        catch (error) {
            console.log(error.message);
        }
        return;
    }
    getFilePath(key, locale, extension) {
        const filename = extension ? `${key}.${extension}` : key;
        const filePath = (0, url_join_ts_1.urlJoin)(this.config.path, locale, filename);
        return filePath;
    }
}
exports.S3TtsCache = S3TtsCache;
//# sourceMappingURL=S3TtsCache.js.map