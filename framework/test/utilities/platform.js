"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyPlatform = exports.ExamplePlatform = exports.ExamplePlatformDevice = exports.ExamplePlatformUser = exports.ExamplePlatformOutputConverterStrategy = exports.ExamplePlatformJovo = exports.ExamplePlatformResponse = exports.ExamplePlatformRequestBuilder = exports.ExamplePlatformRequest = void 0;
const output_1 = require("@jovotech/output");
const src_1 = require("../../src");
class ExamplePlatformRequest extends src_1.JovoRequest {
    constructor() {
        super(...arguments);
        this.input = {};
        this.session = {};
    }
    getUserId() {
        return;
    }
    setUserId() {
        return;
    }
    getLocale() {
        return undefined;
    }
    setLocale() {
        return;
    }
    getIntent() {
        return this.input.intent;
    }
    setIntent() {
        return;
    }
    getEntities() {
        return this.input.entities;
    }
    getInputType() {
        return this.input.type;
    }
    getInputText() {
        return this.input.text;
    }
    getInputAudio() {
        return this.input.audio;
    }
    getSessionData() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.data;
    }
    setSessionData() {
        return;
    }
    getSessionId() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.id;
    }
    isNewSession() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.isNew;
    }
    getDeviceCapabilities() {
        return;
    }
}
exports.ExamplePlatformRequest = ExamplePlatformRequest;
class ExamplePlatformRequestBuilder extends src_1.RequestBuilder {
    launch() {
        return new ExamplePlatformRequest();
    }
    intent() {
        return new ExamplePlatformRequest();
    }
}
exports.ExamplePlatformRequestBuilder = ExamplePlatformRequestBuilder;
class ExamplePlatformResponse extends src_1.JovoResponse {
    constructor() {
        super(...arguments);
        this.output = [];
        this.session = {};
    }
    hasSessionEnded() {
        return false;
    }
}
exports.ExamplePlatformResponse = ExamplePlatformResponse;
class ExamplePlatformJovo extends src_1.Jovo {
}
exports.ExamplePlatformJovo = ExamplePlatformJovo;
class ExamplePlatformOutputConverterStrategy extends output_1.OutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.platformName = 'Example';
        this.responseClass = ExamplePlatformResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromResponse(response) {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toResponse(output) {
        output = Array.isArray(output) ? output : [output];
        return this.normalizeResponse({
            output,
        });
    }
}
exports.ExamplePlatformOutputConverterStrategy = ExamplePlatformOutputConverterStrategy;
class ExamplePlatformUser extends src_1.JovoUser {
    get id() {
        return 'ExamplePlatformUser';
    }
}
exports.ExamplePlatformUser = ExamplePlatformUser;
class ExamplePlatformDevice extends src_1.JovoDevice {
}
exports.ExamplePlatformDevice = ExamplePlatformDevice;
class ExamplePlatform extends src_1.Platform {
    constructor() {
        super(...arguments);
        this.id = 'example';
        this.outputTemplateConverterStrategy = new ExamplePlatformOutputConverterStrategy();
        this.requestClass = ExamplePlatformRequest;
        this.jovoClass = ExamplePlatformJovo;
        this.userClass = ExamplePlatformUser;
        this.deviceClass = ExamplePlatformDevice;
        this.requestBuilder = ExamplePlatformRequestBuilder;
    }
    getDefaultConfig() {
        return {};
    }
    mount(parent) {
        super.mount(parent);
        this.middlewareCollection.use('after.request.end', (jovo) => {
            this.enableDatabaseSessionStorage(jovo);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isRequestRelated(request) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isResponseRelated(response) {
        return true;
    }
    finalizeResponse(response, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jovo) {
        if (Array.isArray(response)) {
            response.forEach((res) => {
                res.session = jovo.$session;
            });
        }
        else {
            response.session = jovo.$session;
        }
        return response;
    }
}
exports.ExamplePlatform = ExamplePlatform;
class EmptyPlatform extends ExamplePlatform {
    initializeMiddlewareCollection() {
        return new src_1.MiddlewareCollection();
    }
}
exports.EmptyPlatform = EmptyPlatform;
//# sourceMappingURL=platform.js.map