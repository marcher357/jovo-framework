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
const framework_1 = require("@jovotech/framework");
const GoogleBusiness_1 = require("./GoogleBusiness");
(0, framework_1.registerPlatformSpecificJovoReference)('$googleBusiness', GoogleBusiness_1.GoogleBusiness);
__exportStar(require("./GoogleBusiness"), exports);
__exportStar(require("./GoogleBusinessPlatform"), exports);
__exportStar(require("./GoogleBusinessRequest"), exports);
__exportStar(require("./GoogleBusinessResponse"), exports);
__exportStar(require("./GoogleBusinessUser"), exports);
__exportStar(require("./GoogleBusinessDevice"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./output"), exports);
//# sourceMappingURL=index.js.map