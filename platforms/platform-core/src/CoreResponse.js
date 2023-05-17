"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreResponse = void 0;
const output_1 = require("@jovotech/output");
const _1 = require(".");
class CoreResponse extends output_1.JovoResponse {
    hasSessionEnded() {
        return this.context.session.end;
    }
    getSpeech() {
        const speech = [];
        this.output.forEach((output) => {
            if (output.message) {
                // The message property can either be a string or an object with a speech property.
                if (typeof output.message === 'object' && output.message.speech) {
                    speech.push(output.message.speech);
                }
                if (typeof output.message === 'string') {
                    speech.push(output.message);
                }
            }
        });
        if (speech.length === 1) {
            return speech[0];
        }
        if (speech.length === 0) {
            return undefined;
        }
        return speech;
    }
    getReprompt() {
        const reprompts = [];
        this.output.forEach((output) => {
            if (output.reprompt) {
                // The reprompt property can either be a string or an object with a speech property.
                if (typeof output.reprompt === 'object' && output.reprompt.speech) {
                    reprompts.push(output.reprompt.speech);
                }
                if (typeof output.reprompt === 'string') {
                    reprompts.push(output.reprompt);
                }
            }
        });
        if (reprompts.length === 1) {
            return reprompts[0];
        }
        if (reprompts.length === 0) {
            return undefined;
        }
        return reprompts;
    }
    replaceSpeech(speech) {
        const speechArray = Array.isArray(speech) ? speech : [speech];
        for (let speechIndex = 0; speechIndex < speechArray.length; speechIndex++) {
            for (let outputIndex = speechIndex; outputIndex < this.output.length; outputIndex++) {
                if (this.output[outputIndex].message) {
                    if (typeof this.output[outputIndex].message === 'string') {
                        this.output[outputIndex].message = speechArray[speechIndex];
                        break; // continue with the next speech item (outer loop)
                    }
                    if (typeof this.output[outputIndex].message === 'object') {
                        // TODO: Clean this up
                        this.output[outputIndex].message.speech = speechArray[speechIndex];
                        break; // continue with the next speech item (outer loop)
                    }
                }
            }
        }
    }
    replaceReprompt(reprompt) {
        const repromptArray = Array.isArray(reprompt) ? reprompt : [reprompt];
        for (let repromptIndex = 0; repromptIndex < repromptArray.length; repromptIndex++) {
            for (let outputIndex = repromptIndex; outputIndex < this.output.length; outputIndex++) {
                if (this.output[outputIndex].reprompt) {
                    if (typeof this.output[outputIndex].reprompt === 'string') {
                        this.output[outputIndex].reprompt = repromptArray[repromptIndex];
                        break; // continue with the next reprompt item (outer loop)
                    }
                    if (typeof this.output[outputIndex].reprompt === 'object') {
                        // TODO: Clean this up
                        this.output[outputIndex].reprompt.speech =
                            repromptArray[repromptIndex];
                        break; // continue with the next reprompt item (outer loop)
                    }
                }
            }
        }
    }
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CoreResponse.prototype, "version", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CoreResponse.prototype, "platform", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => output_1.NormalizedOutputTemplate),
    __metadata("design:type", Array)
], CoreResponse.prototype, "output", void 0);
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => _1.CoreResponseContext),
    __metadata("design:type", _1.CoreResponseContext)
], CoreResponse.prototype, "context", void 0);
exports.CoreResponse = CoreResponse;
//# sourceMappingURL=CoreResponse.js.map