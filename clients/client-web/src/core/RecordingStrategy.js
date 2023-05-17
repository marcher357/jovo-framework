"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingStrategy = exports.RecordingModalityType = void 0;
var RecordingModalityType;
(function (RecordingModalityType) {
    RecordingModalityType["Audio"] = "AUDIO";
})(RecordingModalityType = exports.RecordingModalityType || (exports.RecordingModalityType = {}));
class RecordingStrategy {
    constructor(client) {
        this.client = client;
    }
}
exports.RecordingStrategy = RecordingStrategy;
//# sourceMappingURL=RecordingStrategy.js.map