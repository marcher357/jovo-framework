"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaHandles = exports.PlaybackControllerType = exports.AudioPlayerType = exports.IspType = void 0;
var IspType;
(function (IspType) {
    IspType["Upsell"] = "Upsell";
    IspType["Buy"] = "Buy";
    IspType["Cancel"] = "Cancel";
})(IspType = exports.IspType || (exports.IspType = {}));
var AudioPlayerType;
(function (AudioPlayerType) {
    AudioPlayerType["PlaybackStarted"] = "AudioPlayer.PlaybackStarted";
    AudioPlayerType["PlaybackNearlyFinished"] = "AudioPlayer.PlaybackNearlyFinished";
    AudioPlayerType["PlaybackFinished"] = "AudioPlayer.PlaybackFinished";
    AudioPlayerType["PlaybackStopped"] = "AudioPlayer.PlaybackStopped";
    AudioPlayerType["PlaybackFailed"] = "AudioPlayer.PlaybackFailed";
})(AudioPlayerType = exports.AudioPlayerType || (exports.AudioPlayerType = {}));
var PlaybackControllerType;
(function (PlaybackControllerType) {
    PlaybackControllerType["NextCommandIssued"] = "PlaybackController.NextCommandIssued";
    PlaybackControllerType["PreviousCommandIssued"] = "PlaybackController.PreviousCommandIssued";
    PlaybackControllerType["PlayCommandIssued"] = "PlaybackController.PlayCommandIssued";
    PlaybackControllerType["PauseCommandIssued"] = "PlaybackController.PauseCommandIssued";
})(PlaybackControllerType = exports.PlaybackControllerType || (exports.PlaybackControllerType = {}));
class AlexaHandles {
    static onPermission(status, type) {
        return {
            global: true,
            types: ['Connections.Response'],
            platforms: ['alexa'],
            if: (jovo) => {
                var _a, _b, _c, _d, _e;
                return ((_a = jovo.$request.request) === null || _a === void 0 ? void 0 : _a.name) === 'AskFor' &&
                    ((_c = (_b = jovo.$request.request) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.status) === status &&
                    (type
                        ? ((_e = (_d = jovo.$request.request) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.permissionScope) ===
                            `alexa::alerts:${type}:skill:readwrite`
                        : true);
            },
        };
    }
    static onIsp(type, purchaseResult) {
        return {
            global: true,
            types: ['Connections.Response'],
            platforms: ['alexa'],
            if: (jovo) => {
                var _a, _b, _c;
                const result = purchaseResult
                    ? ((_b = (_a = jovo.$request.request) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.purchaseResult) === purchaseResult
                    : true;
                return ((_c = jovo.$request.request) === null || _c === void 0 ? void 0 : _c.name) === type && result;
            },
        };
    }
    static onDialogApiInvoked(name) {
        return {
            global: true,
            types: ['Dialog.API.Invoked'],
            platforms: ['alexa'],
            if: (jovo) => { var _a, _b; return name ? ((_b = (_a = jovo.$request.request) === null || _a === void 0 ? void 0 : _a.apiRequest) === null || _b === void 0 ? void 0 : _b.name) === name : true; },
        };
    }
    static onAudioPlayer(type) {
        return {
            global: true,
            types: [type],
            platforms: ['alexa'],
        };
    }
    static onPlaybackController(type) {
        return {
            global: true,
            types: [type],
            platforms: ['alexa'],
        };
    }
    static onCanFulfillIntentRequest() {
        return {
            global: true,
            types: ['CanFulfillIntentRequest'],
            platforms: ['alexa'],
        };
    }
}
exports.AlexaHandles = AlexaHandles;
//# sourceMappingURL=AlexaHandles.js.map