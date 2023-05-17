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
exports.GlobalComponent = void 0;
const framework_1 = require("@jovotech/framework");
const LoveHatePizzaComponent_1 = require("./LoveHatePizzaComponent");
let GlobalComponent = class GlobalComponent extends framework_1.BaseComponent {
    LAUNCH() {
        return this.$redirect(LoveHatePizzaComponent_1.LoveHatePizzaComponent);
    }
    // ITEMS CREATED
    handleCreatedItems() {
        var _a;
        const body = this.$alexa.$request.request.body;
        if (!(body === null || body === void 0 ? void 0 : body.listItemIds) || !(body === null || body === void 0 ? void 0 : body.listId)) {
            return;
        }
        const listId = body.listId;
        console.log(`Added ${body.listItemIds} to ${listId}`);
        (_a = this.$alexa.$user) === null || _a === void 0 ? void 0 : _a.getListItems(listId, body.listItemIds).then(result => console.log('The created items are: ', result));
    }
    // ITEMS UPDATED
    async handleUpdatedItems() {
        const body = this.$alexa.$request.request.body;
        console.log(`Modified ${body === null || body === void 0 ? void 0 : body.listItemIds} from ${body === null || body === void 0 ? void 0 : body.listId}`);
    }
    // ITEMS DELETED
    async handleDeletedItems() {
        const body = this.$alexa.$request.request.body;
        console.log(`Deleted ${body === null || body === void 0 ? void 0 : body.listItemIds} from ${body === null || body === void 0 ? void 0 : body.listId}`);
    }
};
__decorate([
    (0, framework_1.Handle)({
        global: true,
        types: ['AlexaHouseholdListEvent.ItemsCreated'],
        platforms: ['alexa'],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GlobalComponent.prototype, "handleCreatedItems", null);
__decorate([
    (0, framework_1.Handle)({
        global: true,
        types: ['AlexaHouseholdListEvent.ItemsUpdated'],
        platforms: ['alexa'],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalComponent.prototype, "handleUpdatedItems", null);
__decorate([
    (0, framework_1.Handle)({
        global: true,
        types: ['AlexaHouseholdListEvent.ItemsDeleted'],
        platforms: ['alexa'],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalComponent.prototype, "handleDeletedItems", null);
GlobalComponent = __decorate([
    (0, framework_1.Global)(),
    (0, framework_1.Component)()
], GlobalComponent);
exports.GlobalComponent = GlobalComponent;
//# sourceMappingURL=GlobalComponent.js.map