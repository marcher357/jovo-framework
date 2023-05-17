"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollyTts = void 0;
const client_polly_1 = require("@aws-sdk/client-polly");
const framework_1 = require("@jovotech/framework");
class PollyTts extends framework_1.TtsPlugin {
    constructor(config) {
        super(config);
        this.supportedSsmlTags = [
            'break',
            'emphasis',
            'lang',
            'mark',
            'p',
            'phoneme',
            'prosody',
            's',
            'say-as',
            'speak',
            'sub',
            'w',
            'amazon:breath',
            'amazon:domain',
            'amazon:effect',
        ];
        this.client = new client_polly_1.PollyClient(Object.assign({}, this.config.libraryConfig));
    }
    getDefaultConfig() {
        return {
            outputFormat: 'mp3',
            voiceId: 'Matthew',
            sampleRate: '16000',
            engine: 'standard',
            fallbackLocale: 'en-US',
        };
    }
    getKeyPrefix() {
        return `polly-${this.config.voiceId.toLowerCase()}`;
    }
    async processTts(jovo, text, textType) {
        const params = {
            Text: text,
            TextType: textType,
            OutputFormat: this.config.outputFormat,
            VoiceId: this.config.voiceId,
            SampleRate: this.config.sampleRate,
            LanguageCode: this.config.languageCode,
            SpeechMarkTypes: this.config.speechMarkTypes,
            Engine: this.config.engine,
            LexiconNames: this.config.lexiconNames,
        };
        const command = new client_polly_1.SynthesizeSpeechCommand(params);
        try {
            const response = await this.client.send(command);
            if (!response.AudioStream) {
                return;
            }
            const result = {
                contentType: response.ContentType,
                text,
                fileExtension: this.config.outputFormat,
                encodedAudio: await framework_1.AudioUtilities.getBase64Audio(response.AudioStream),
            };
            return result;
        }
        catch (error) {
            console.log(error.message);
        }
        return;
    }
}
exports.PollyTts = PollyTts;
//# sourceMappingURL=PollyTts.js.map