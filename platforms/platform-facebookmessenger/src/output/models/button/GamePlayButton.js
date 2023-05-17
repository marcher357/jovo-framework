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
exports.GamePlayButton = exports.GameMetaData = void 0;
const output_1 = require("@jovotech/output");
const IsValidGameMetaDataString_1 = require("../../decorators/validation/IsValidGameMetaDataString");
const Button_1 = require("./Button");
class GameMetaData {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, IsValidGameMetaDataString_1.IsValidGameMetaDataString)(),
    __metadata("design:type", String)
], GameMetaData.prototype, "player_id", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, IsValidGameMetaDataString_1.IsValidGameMetaDataString)(),
    __metadata("design:type", String)
], GameMetaData.prototype, "context_id", void 0);
exports.GameMetaData = GameMetaData;
class GamePlayButton extends Button_1.ButtonBase {
}
__decorate([
    (0, output_1.Equals)(Button_1.ButtonType.GamePlay),
    __metadata("design:type", String)
], GamePlayButton.prototype, "type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GamePlayButton.prototype, "title", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GamePlayButton.prototype, "payload", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => GameMetaData),
    __metadata("design:type", GameMetaData)
], GamePlayButton.prototype, "game_metadata", void 0);
exports.GamePlayButton = GamePlayButton;
//# sourceMappingURL=GamePlayButton.js.map