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
exports.Entity = exports.SessionEntityType = exports.EntityOverrideMode = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../constants");
const EntitySynonymsContainValue_1 = require("../decorators/validation/EntitySynonymsContainValue");
var EntityOverrideMode;
(function (EntityOverrideMode) {
    EntityOverrideMode["Unspecified"] = "ENTITY_OVERRIDE_MODE_UNSPECIFIED";
    EntityOverrideMode["Override"] = "ENTITY_OVERRIDE_MODE_OVERRIDE";
    EntityOverrideMode["Supplement"] = "ENTITY_OVERRIDE_MODE_SUPPLEMENT";
})(EntityOverrideMode = exports.EntityOverrideMode || (exports.EntityOverrideMode = {}));
class SessionEntityType {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SessionEntityType.prototype, "name", void 0);
__decorate([
    (0, output_1.IsEnum)(EntityOverrideMode),
    __metadata("design:type", String)
], SessionEntityType.prototype, "entity_override_mode", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => Entity),
    __metadata("design:type", Array)
], SessionEntityType.prototype, "entities", void 0);
exports.SessionEntityType = SessionEntityType;
class Entity {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Entity.prototype, "value", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMinSize)(constants_1.SESSION_ENTITY_TYPE_SYNONYMS_MIN_SIZE),
    (0, output_1.IsString)({ each: true }),
    (0, output_1.IsNotEmpty)({ each: true }),
    (0, EntitySynonymsContainValue_1.EntitySynonymsContainValue)(),
    __metadata("design:type", Array)
], Entity.prototype, "synonyms", void 0);
exports.Entity = Entity;
//# sourceMappingURL=SessionEntityType.js.map