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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const Utilities = __importStar(require("../../src/utilities"));
jest.mock('../../src/utilities');
jest
    .spyOn(Utilities, 'copy')
    .mockImplementation((request, config) => JSON.parse(JSON.stringify(request)));
const mockedLog = jest.spyOn(console, 'log').mockReturnThis();
beforeEach(() => {
    jest.clearAllMocks();
});
describe('constructor', () => {
    test('should fill "enabled" properties if not set', () => {
        const logging = new src_1.BasicLogging({ enabled: false });
        expect(logging.config.request.enabled).toBeFalsy();
        expect(logging.config.response.enabled).toBeFalsy();
    });
    test('should add default request/response config', () => {
        const logging = new src_1.BasicLogging({
            request: { enabled: false },
            response: { enabled: false },
        });
        const defaultConfig = {
            enabled: false,
            excludedObjects: [],
            maskedObjects: [],
            objects: [],
        };
        expect(logging.config.request).toStrictEqual(defaultConfig);
        expect(logging.config.response).toStrictEqual(defaultConfig);
    });
});
describe('getDefaultConfig()', () => {
    test('should return default config', () => {
        const defaultConfig = {
            skipTests: true,
            enabled: true,
            request: {
                enabled: true,
                excludedObjects: [],
                maskedObjects: [],
                objects: [],
            },
            response: {
                enabled: true,
                excludedObjects: [],
                maskedObjects: [],
                objects: [],
            },
            format: src_1.LoggingFormat.Pretty,
            styling: true,
            maskValue: '[ Hidden ]',
            indentation: 2,
            colorizeSettings: {
                colors: {
                    STRING_KEY: 'white',
                    STRING_LITERAL: 'green',
                    NUMBER_LITERAL: 'yellow',
                    BRACE: 'white.bold',
                },
            },
        };
        const logging = new src_1.BasicLogging();
        expect(logging.config).toStrictEqual(defaultConfig);
    });
});
describe('mount()', () => {
    test('should not log if disabled', async () => {
        const mockedLogRequest = jest
            .spyOn(src_1.BasicLogging.prototype, 'logRequest')
            .mockReturnThis();
        const mockedLogResponse = jest
            .spyOn(src_1.BasicLogging.prototype, 'logResponse')
            .mockReturnThis();
        const logging = new src_1.BasicLogging({
            request: { enabled: false },
            response: { enabled: false },
        });
        const handleRequest = new src_1.HandleRequest(new src_1.App(), {});
        logging.mount(handleRequest);
        await handleRequest.middlewareCollection.run('request.start', {});
        await handleRequest.middlewareCollection.run('response.end', {});
        expect(mockedLogRequest).toBeCalledTimes(0);
        expect(mockedLogResponse).toBeCalledTimes(0);
        mockedLogRequest.mockRestore();
        mockedLogResponse.mockRestore();
    });
    test('should log if enabled', async () => {
        const mockedLogRequest = jest
            .spyOn(src_1.BasicLogging.prototype, 'logRequest')
            .mockReturnThis();
        const mockedLogResponse = jest
            .spyOn(src_1.BasicLogging.prototype, 'logResponse')
            .mockReturnThis();
        const logging = new src_1.BasicLogging();
        const handleRequest = new src_1.HandleRequest(new src_1.App(), {});
        logging.mount(handleRequest);
        await handleRequest.middlewareCollection.run('request.start', {});
        await handleRequest.middlewareCollection.run('response.end', {});
        expect(mockedLogRequest).toBeCalledTimes(1);
        expect(mockedLogResponse).toBeCalledTimes(1);
        mockedLogRequest.mockRestore();
        mockedLogResponse.mockRestore();
    });
});
describe('logRequest()', () => {
    test('should set _BASIC_LOGGING_START to now', async () => {
        const now = 123;
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(now);
        const logging = new src_1.BasicLogging();
        const jovo = { $request: { foo: 'bar' }, $data: {} };
        await logging.logRequest(jovo);
        expect(jovo.$data._BASIC_LOGGING_START).toEqual(now);
    });
    test('should call mask() if configured', async () => {
        const maskedObjects = ['foo'];
        const maskValue = 'MASK';
        const logging = new src_1.BasicLogging({
            maskValue,
            request: {
                enabled: true,
                maskedObjects,
            },
        });
        const request = { foo: 'bar' };
        const jovo = { $request: request, $data: {} };
        await logging.logRequest(jovo);
        expect(Utilities.copy).toBeCalledTimes(1);
        expect(Utilities.mask).toBeCalledTimes(1);
        expect(Utilities.mask).toBeCalledWith(request, maskedObjects, maskValue);
    });
    test('should log in pretty format', async () => {
        const logging = new src_1.BasicLogging({
            format: src_1.LoggingFormat.Pretty,
        });
        const request = { foo: 'bar' };
        const jovo = { $request: request, $data: {} };
        await logging.logRequest(jovo);
        expect(mockedLog).toBeCalledTimes(2);
    });
    test('should log in json format', async () => {
        const logging = new src_1.BasicLogging({
            format: src_1.LoggingFormat.Json,
        });
        const request = { foo: 'bar' };
        const jovo = { $request: request, $data: {} };
        await logging.logRequest(jovo);
        expect(mockedLog).toBeCalledTimes(1);
    });
});
describe('logResponse()', () => {
    test('should call mask() if configured', async () => {
        const maskedObjects = ['foo'];
        const maskValue = 'MASK';
        const logging = new src_1.BasicLogging({
            maskValue,
            response: {
                enabled: true,
                maskedObjects,
            },
        });
        const response = { foo: 'bar' };
        const jovo = { $response: response, $data: {} };
        await logging.logResponse(jovo);
        expect(Utilities.copy).toBeCalledTimes(1);
        expect(Utilities.mask).toBeCalledTimes(1);
        expect(Utilities.mask).toBeCalledWith(response, maskedObjects, maskValue);
    });
    test('should log in pretty format', async () => {
        const logging = new src_1.BasicLogging({
            format: src_1.LoggingFormat.Pretty,
        });
        const response = { foo: 'bar' };
        const jovo = { $response: response, $data: {} };
        await logging.logResponse(jovo);
        expect(mockedLog).toBeCalledTimes(2);
    });
    test('should log in json format', async () => {
        const logging = new src_1.BasicLogging({
            format: src_1.LoggingFormat.Json,
        });
        const response = { foo: 'bar' };
        const jovo = { $response: response, $data: {} };
        await logging.logResponse(jovo);
        expect(mockedLog).toBeCalledTimes(1);
    });
});
//# sourceMappingURL=BasicLogging.test.js.map