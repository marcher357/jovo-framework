"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserDetector = void 0;
const detect_browser_1 = require("detect-browser");
class BrowserDetector {
    static detect() {
        if (!this.detectedData) {
            const detectedData = (0, detect_browser_1.detect)();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((detectedData === null || detectedData === void 0 ? void 0 : detectedData.name) === 'chrome' && navigator.brave) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                detectedData.name = 'brave';
            }
            this.detectedData = detectedData;
        }
        return this.detectedData;
    }
    static isChrome() {
        const detectedData = this.detectedData || this.detect();
        if (!detectedData) {
            return false;
        }
        return detectedData.name === 'chrome';
    }
}
exports.BrowserDetector = BrowserDetector;
BrowserDetector.detectedData = null;
//# sourceMappingURL=BrowserDetector.js.map