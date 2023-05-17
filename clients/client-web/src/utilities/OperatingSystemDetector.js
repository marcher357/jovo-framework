"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingSystemDetector = void 0;
const BrowserDetector_1 = require("./BrowserDetector");
class OperatingSystemDetector {
    static isWindows() {
        var _a;
        const detectedData = BrowserDetector_1.BrowserDetector.detect();
        if (!detectedData) {
            return false;
        }
        return !!((_a = detectedData.os) === null || _a === void 0 ? void 0 : _a.startsWith('Window')) && detectedData.os !== 'Windows Mobile';
    }
}
exports.OperatingSystemDetector = OperatingSystemDetector;
//# sourceMappingURL=OperatingSystemDetector.js.map