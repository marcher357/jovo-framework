"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMessageToFacebookMessengerMessage = void 0;
const output_1 = require("@jovotech/output");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
// augment the prototypes of the generic models to have methods to convert to the FacebookMessenger-variant
(0, utilities_1.augmentModelPrototypes)();
// Additionally, make class-validator and class-transformer aware of the added property.
(0, output_1.registerOutputPlatform)('facebookMessenger', models_1.NormalizedFacebookMessengerOutputTemplate);
__exportStar(require("./decorators/transformation/TransformButton"), exports);
__exportStar(require("./decorators/transformation/TransformTemplate"), exports);
__exportStar(require("./decorators/transformation/TransformQuickReply"), exports);
__exportStar(require("./decorators/validation/CastedMaxLength"), exports);
__exportStar(require("./decorators/validation/IsValidGameMetaDataString"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./FacebookMessengerOutputTemplateConverterStrategy"), exports);
var utilities_2 = require("./utilities");
Object.defineProperty(exports, "convertMessageToFacebookMessengerMessage", { enumerable: true, get: function () { return utilities_2.convertMessageToFacebookMessengerMessage; } });
//# sourceMappingURL=index.js.map