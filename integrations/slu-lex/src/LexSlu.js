"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexSlu = void 0;
const client_lex_runtime_v2_1 = require("@aws-sdk/client-lex-runtime-v2");
const framework_1 = require("@jovotech/framework");
const zlib_1 = require("zlib");
function asyncGunzip(buffer) {
    return new Promise((resolve, reject) => {
        (0, zlib_1.gunzip)(buffer, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
class LexSlu extends framework_1.SluPlugin {
    constructor(config) {
        super(config);
        this.targetSampleRate = 16000;
        this.supportedLocaleIds = [
            'ca_ES',
            'de_AT',
            'de_DE',
            'en_AU',
            'en_GB',
            'en_IN',
            'en_US',
            'en_ZA',
            'es_419',
            'es_ES',
            'es_US',
            'fr_CA',
            'fr_FR',
            'it_IT',
            'ja_JP',
            'ko_KR',
            'pt_BR',
            'pt_PT',
            'zh_CN',
        ];
        this.asrOutput = {};
        this.client = new client_lex_runtime_v2_1.LexRuntimeV2Client({
            credentials: this.config.credentials,
            region: this.config.region,
        });
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { bot: { id: '', aliasId: '' }, region: '', credentials: {
                accessKeyId: '',
                secretAccessKey: '',
            }, fallbackLocale: 'en_US', asr: true, nlu: true });
    }
    getInitConfig() {
        return {
            bot: { id: '', aliasId: '' },
            region: '',
            credentials: {
                accessKeyId: '',
                secretAccessKey: '',
            },
        };
    }
    async processAudio(jovo, audio) {
        if (!this.config.asr || !jovo.$session.id) {
            return;
        }
        const params = {
            botId: this.config.bot.id,
            botAliasId: this.config.bot.aliasId,
            requestContentType: `audio/x-l16; sample-rate=${audio.sampleRate}; channel-count=1`,
            inputStream: audio.toWav(),
            localeId: this.getLocale(jovo),
            sessionId: jovo.$session.id,
        };
        const command = new client_lex_runtime_v2_1.RecognizeUtteranceCommand(params);
        const response = await this.client.send(command);
        if (!response.inputTranscript) {
            return;
        }
        // The return inputTranscript is a gzipped string that is encoded with base64
        // base64 -> gzip
        const parsedText = (await this.extractValue(response.inputTranscript));
        const interpretations = (await this.extractValue(response.interpretations));
        const messages = (await this.extractValue(response.messages));
        const sessionState = (await this.extractValue(response.sessionState));
        this.asrOutput = { interpretations, messages, sessionState };
        return {
            text: parsedText,
        };
    }
    async processText(jovo, text) {
        if (!this.config.nlu || !jovo.$session.id) {
            return;
        }
        if (this.asrOutput.interpretations) {
            // Lex already returned output as part of ASR
            // Skip the extra call to Lex and the extra $$
            // Assuming the interpretations will be sorted by confidence,
            return this.getNluDataFromInterpretation(this.asrOutput.interpretations[0], this.asrOutput.messages, this.asrOutput.sessionState);
        }
        else {
            // Text input so ASR was skipped
            const params = {
                botId: this.config.bot.id,
                botAliasId: this.config.bot.aliasId,
                text,
                localeId: this.getLocale(jovo),
                sessionId: jovo.$session.id,
            };
            const command = new client_lex_runtime_v2_1.RecognizeTextCommand(params);
            const response = await this.client.send(command);
            if (!response.interpretations) {
                return;
            }
            // Assuming the interpretations will be sorted by confidence,
            return this.getNluDataFromInterpretation(response.interpretations[0], response.messages, response.sessionState);
        }
    }
    getNluDataFromInterpretation(interpretation, messages, sessionState) {
        var _a;
        if (!interpretation.intent) {
            return;
        }
        const nluData = {
            intent: {
                name: interpretation.intent.name || '',
                confidence: (_a = interpretation.nluConfidence) === null || _a === void 0 ? void 0 : _a.score,
                state: interpretation.intent.state,
                confirmationState: interpretation.intent.confirmationState,
            },
            messages: messages,
        };
        if (interpretation.intent.slots) {
            nluData.entities = Object.entries(interpretation.intent.slots).reduce((entities, [name, slot]) => {
                var _a;
                if (!(slot === null || slot === void 0 ? void 0 : slot.value)) {
                    return entities;
                }
                const resolved = ((_a = slot.value.resolvedValues) === null || _a === void 0 ? void 0 : _a[0]) || slot.value.interpretedValue;
                entities[name] = {
                    id: resolved,
                    resolved,
                    value: slot.value.originalValue || slot.value.interpretedValue,
                    native: slot,
                };
                return entities;
            }, {});
        }
        if (sessionState === null || sessionState === void 0 ? void 0 : sessionState.dialogAction) {
            nluData.sessionState = {
                dialogAction: sessionState.dialogAction,
            };
        }
        return nluData;
    }
    getLocale(jovo) {
        var _a, _b;
        const locale = this.config.locale || jovo.$request.getLocale() || '';
        return this.supportedLocaleIds.includes(locale)
            ? locale
            : ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.localeMap) === null || _b === void 0 ? void 0 : _b[locale]) || this.config.fallbackLocale;
    }
    async extractValue(input) {
        if (!input) {
            return;
        }
        const buffer = Buffer.from(input, 'base64');
        // gzip -> string
        const textBuffer = await asyncGunzip(buffer);
        // inputTranscript - The string of textBuffer will always contain double quotes, therefore we can parse it with JSON to get rid of it.
        // interpretations - JSON array
        // messages - JSON array
        const value = JSON.parse(textBuffer.toString());
        return value;
    }
}
exports.LexSlu = LexSlu;
//# sourceMappingURL=LexSlu.js.map