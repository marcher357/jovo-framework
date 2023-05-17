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
exports.LoveHatePizzaComponent = void 0;
const framework_1 = require("@jovotech/framework");
const YesNoOutput_1 = require("../output/YesNoOutput");
let LoveHatePizzaComponent = class LoveHatePizzaComponent extends framework_1.BaseComponent {
    START() {
        return this.$send(YesNoOutput_1.YesNoOutput, { message: 'Do you like Pizza?' });
    }
    lovesPizza() {
        return this.$send({ message: 'Yes! I love pizza, too.' });
    }
    hatesPizza() {
        return this.$send({ message: `That's OK! Not everyone likes pizza.` });
    }
    UNHANDLED() {
        return this.START();
    }
};
__decorate([
    (0, framework_1.Intents)('YesIntent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoveHatePizzaComponent.prototype, "lovesPizza", null);
__decorate([
    (0, framework_1.Intents)('NoIntent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoveHatePizzaComponent.prototype, "hatesPizza", null);
LoveHatePizzaComponent = __decorate([
    (0, framework_1.Component)()
], LoveHatePizzaComponent);
exports.LoveHatePizzaComponent = LoveHatePizzaComponent;
//# sourceMappingURL=LoveHatePizzaComponent.js.map