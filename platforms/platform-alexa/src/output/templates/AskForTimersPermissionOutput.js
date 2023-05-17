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
exports.AskForTimersPermissionOutput = void 0;
const framework_1 = require("@jovotech/framework");
const models_1 = require("../models");
const AskForPermissionOutput_1 = require("./AskForPermissionOutput");
let AskForTimersPermissionOutput = class AskForTimersPermissionOutput extends AskForPermissionOutput_1.AskForPermissionOutput {
    constructor(jovo) {
        super(jovo);
        this.options.permissionScope = models_1.PermissionScope.ReadWriteTimers;
    }
};
AskForTimersPermissionOutput = __decorate([
    (0, framework_1.Output)(),
    __metadata("design:paramtypes", [framework_1.Jovo])
], AskForTimersPermissionOutput);
exports.AskForTimersPermissionOutput = AskForTimersPermissionOutput;
//# sourceMappingURL=AskForTimersPermissionOutput.js.map