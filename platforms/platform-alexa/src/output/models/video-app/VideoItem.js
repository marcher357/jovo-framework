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
exports.VideoItem = void 0;
const output_1 = require("@jovotech/output");
const Metadata_1 = require("../common/Metadata");
class VideoItem {
}
__decorate([
    (0, output_1.IsUrl)({ protocols: ['https'] }),
    __metadata("design:type", String)
], VideoItem.prototype, "source", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => Metadata_1.Metadata),
    __metadata("design:type", Metadata_1.Metadata)
], VideoItem.prototype, "metadata", void 0);
exports.VideoItem = VideoItem;
//# sourceMappingURL=VideoItem.js.map