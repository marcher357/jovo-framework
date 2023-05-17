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
exports.convertMessageToInstagramMessage = void 0;
const output_1 = require("@jovotech/output");
const platform_facebookmessenger_1 = require("@jovotech/platform-facebookmessenger");
Object.defineProperty(exports, "convertMessageToInstagramMessage", { enumerable: true, get: function () { return platform_facebookmessenger_1.convertMessageToFacebookMessengerMessage; } });
const models_1 = require("./models");
const utilities_1 = require("./utilities");
// Augment the prototypes of the generic models to have methods to convert to the Instagram-variant
(0, utilities_1.augmentModelPrototypes)();
// Additionally, make class-validator and class-transformer aware of the added property
(0, output_1.registerOutputPlatform)('instagram', models_1.NormalizedInstagramOutputTemplate);
__exportStar(require("@jovotech/platform-facebookmessenger"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./InstagramOutputTemplateConverterStrategy"), exports);
//# sourceMappingURL=index.js.map