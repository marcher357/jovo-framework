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
exports.DialogflowResponse = void 0;
const output_1 = require("@jovotech/output");
const output_2 = require("./output");
class DialogflowResponse extends output_1.JovoResponse {
    hasSessionEnded() {
        return !!this.end_interaction;
    }
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DialogflowResponse.prototype, "fulfillment_text", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => output_2.Message),
    __metadata("design:type", Array)
], DialogflowResponse.prototype, "fulfillment_messages", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DialogflowResponse.prototype, "source", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsObject)(),
    __metadata("design:type", Object)
], DialogflowResponse.prototype, "payload", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => output_2.Context),
    __metadata("design:type", Array)
], DialogflowResponse.prototype, "output_contexts", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => output_2.EventInput),
    __metadata("design:type", output_2.EventInput)
], DialogflowResponse.prototype, "followup_event_input", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DialogflowResponse.prototype, "end_interaction", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => output_2.SessionEntityType),
    __metadata("design:type", Array)
], DialogflowResponse.prototype, "session_entity_types", void 0);
exports.DialogflowResponse = DialogflowResponse;
//# sourceMappingURL=DialogflowResponse.js.map