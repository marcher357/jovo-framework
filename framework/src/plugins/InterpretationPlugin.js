"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretationPlugin = void 0;
const ParsedAudioInput_1 = require("../audio/ParsedAudioInput");
const InvalidParentError_1 = require("../errors/InvalidParentError");
const Platform_1 = require("../Platform");
const Plugin_1 = require("../Plugin");
// Provide basic functionality that will then be used by AsrPlugin, NluPlugin and SluPlugin
class InterpretationPlugin extends Plugin_1.Plugin {
    mount(parent) {
        if (!(parent instanceof Platform_1.Platform)) {
            throw new InvalidParentError_1.InvalidParentError(this.name, 'Platform');
        }
        if (this.processAudio) {
            parent.middlewareCollection.use('interpretation.asr', (jovo) => {
                return this.asr(jovo);
            });
        }
        if (this.processText) {
            parent.middlewareCollection.use('interpretation.nlu', (jovo) => {
                return this.nlu(jovo);
            });
        }
        if (this.supportsIntentScoping && this.supportsIntentScoping()) {
            parent.middlewareCollection.use('after.response.output', (jovo) => {
                return this.storeListenIntents(jovo); // Store intents in _JOVO_LISTEN_INTENTS_ session variable
            });
        }
    }
    isInputTypeSupported(inputType) {
        return this.config.input.supportedTypes.includes(inputType);
    }
    async asr(jovo) {
        // if this plugin is not able to process audio, a text is already set, no audio is set or the input type is not supported, skip
        if (!this.processAudio ||
            jovo.$input.getText() ||
            !jovo.$input.audio ||
            !this.isInputTypeSupported(jovo.$input.type)) {
            return;
        }
        const parsedAudioInput = ParsedAudioInput_1.ParsedAudioInput.fromAudioInput(jovo.$input.audio);
        if (this.targetSampleRate) {
            parsedAudioInput.sampleDown(this.targetSampleRate);
        }
        const asrProcessResult = await this.processAudio(jovo, parsedAudioInput);
        if (asrProcessResult) {
            jovo.$input.asr = asrProcessResult;
        }
    }
    async nlu(jovo) {
        const text = jovo.$input.getText();
        // if this plugin is not able to process text, no text exists or the input type is not supported, skip
        if (!this.processText || !text || !this.isInputTypeSupported(jovo.$input.type)) {
            return;
        }
        const nluProcessResult = await this.processText(jovo, text);
        if (nluProcessResult) {
            jovo.$input.nlu = nluProcessResult;
            jovo.$entities = nluProcessResult.entities || {};
        }
    }
    /**
     * Extract the intents from the listen objects in all $output templates and store them for the next request
     * @see https://www.jovo.tech/docs/nlu#intent-scoping
     * @param jovo - Jovo instance
     */
    storeListenIntents(jovo) {
        var _a, _b, _c;
        const intents = [];
        for (const output of jovo.$output) {
            const listen = (_c = (_b = (_a = output.platforms) === null || _a === void 0 ? void 0 : _a[jovo.$platform.name]) === null || _b === void 0 ? void 0 : _b.listen) !== null && _c !== void 0 ? _c : output.listen;
            if (typeof listen !== 'object' || !listen.intents) {
                continue;
            }
            intents.push(...listen.intents);
        }
        jovo.$session.data._JOVO_LISTEN_INTENTS_ = intents.length ? intents : undefined;
    }
}
exports.InterpretationPlugin = InterpretationPlugin;
//# sourceMappingURL=InterpretationPlugin.js.map