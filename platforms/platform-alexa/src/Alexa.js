"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alexa = void 0;
const framework_1 = require("@jovotech/framework");
const AlexaIsp_1 = require("./AlexaIsp");
const AlexaAudioPlayer_1 = require("./AlexaAudioPlayer");
class Alexa extends framework_1.Jovo {
    constructor($app, $handleRequest, $platform) {
        super($app, $handleRequest, $platform);
        this.isp = new AlexaIsp_1.AlexaIsp(this);
        this.audioPlayer = new AlexaAudioPlayer_1.AlexaAudioPlayer(this);
    }
    getSkillId() {
        var _a, _b, _c, _d, _e;
        return (((_b = (_a = this.$request.session) === null || _a === void 0 ? void 0 : _a.application) === null || _b === void 0 ? void 0 : _b.applicationId) ||
            ((_e = (_d = (_c = this.$request.context) === null || _c === void 0 ? void 0 : _c.System) === null || _d === void 0 ? void 0 : _d.application) === null || _e === void 0 ? void 0 : _e.applicationId));
    }
}
exports.Alexa = Alexa;
//# sourceMappingURL=Alexa.js.map