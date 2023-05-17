"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputProcessor = void 0;
const Client_1 = require("../Client");
class OutputProcessor {
    constructor(client) {
        this.client = client;
    }
    async processSequence(sequence) {
        const reprompts = sequence
            .filter((outputTemplate) => !!outputTemplate.reprompt)
            .map((outputTemplate) => outputTemplate.reprompt);
        for (const output of sequence) {
            await this.processTemplate(output);
        }
        if (reprompts.length) {
            await this.client.repromptProcessor.processReprompts(reprompts, this.client.previousRecordingModality);
        }
    }
    async processTemplate(output) {
        var _a, _b;
        this.client.emit(Client_1.ClientEvent.Output, output);
        const text = typeof output.message === 'string'
            ? output.message
            : ((_a = output.message) === null || _a === void 0 ? void 0 : _a.speech) || ((_b = output.message) === null || _b === void 0 ? void 0 : _b.text);
        if (!text) {
            return;
        }
        if (this.client.ssmlProcessor.isPlainText(text)) {
            await this.client.speechSynthesizer.speak(text);
        }
        else {
            await this.client.ssmlProcessor.processSSML(text);
        }
    }
}
exports.OutputProcessor = OutputProcessor;
//# sourceMappingURL=OutputProcessor.js.map