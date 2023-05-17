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
const cli_core_1 = __importStar(require("@jovotech/cli-core"));
const BuildHook_1 = require("../../src/cli/hooks/BuildHook");
const Plugin_1 = require("../__mocks__/Plugin");
// Create mock modules. This allows us to modify the behavior for individual functions.
jest.mock('@jovotech/cli-core', () => (Object.assign(Object.assign({}, Object.assign({}, jest.requireActual('@jovotech/cli-core'))), { JovoCli: jest.fn().mockReturnValue({
        project: {
            hasModelFiles: jest.fn(),
            saveModel: jest.fn(),
            backupModel: jest.fn(),
            validateModel: jest.fn(),
        },
    }) })));
jest.mock('@jovotech/model-alexa');
beforeEach(() => {
    const plugin = new Plugin_1.Plugin();
    const cli = new cli_core_1.JovoCli();
    plugin.$cli = cli;
    BuildHook_1.BuildHook.prototype['$cli'] = cli;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    BuildHook_1.BuildHook.prototype['$plugin'] = plugin;
    BuildHook_1.BuildHook.prototype['$context'] = {
        command: 'build',
        locales: [],
        platforms: [],
        flags: {},
        args: {},
        alexa: {},
    };
});
afterEach(() => {
    jest.restoreAllMocks();
});
describe('install()', () => {
    describe('install()', () => {
        test('should register events correctly', () => {
            const hook = new BuildHook_1.BuildHook();
            expect(hook['middlewareCollection']).toBeUndefined();
            hook.install();
            expect(hook['middlewareCollection']).toBeDefined();
        });
    });
});
describe('checkForPlatform()', () => {
    test('should do nothing if platform plugin is selected', () => {
        const uninstall = jest.fn();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'uninstall').mockImplementation(uninstall);
        const hook = new BuildHook_1.BuildHook();
        hook.$context.platforms.push('testPlugin');
        hook.checkForPlatform();
        expect(uninstall).not.toBeCalled();
    });
    test('should call uninstall() if platform plugin is not selected', () => {
        const uninstall = jest.fn();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'uninstall').mockImplementation(() => uninstall());
        const hook = new BuildHook_1.BuildHook();
        hook.$context.platforms.push('invalid');
        hook.checkForPlatform();
        expect(uninstall).toBeCalledTimes(1);
    });
});
describe('checkForCleanBuild()', () => {
    test('should not do anything if --clean is not set', () => {
        jest.spyOn(cli_core_1.default, 'deleteFolderRecursive').mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        hook.checkForCleanBuild();
        expect(cli_core_1.default.deleteFolderRecursive).not.toBeCalled();
    });
    test('should call deleteFolderRecursive() if --clean is set', () => {
        jest.spyOn(cli_core_1.default, 'deleteFolderRecursive').mockReturnThis();
        jest.spyOn(BuildHook_1.BuildHook.prototype.$plugin, 'platformPath', 'get').mockReturnValue('test');
        const hook = new BuildHook_1.BuildHook();
        hook.$context.flags.clean = true;
        hook.checkForCleanBuild();
        expect(cli_core_1.default.deleteFolderRecursive).toBeCalledTimes(1);
        expect(cli_core_1.default.deleteFolderRecursive).toBeCalledWith('test');
    });
});
describe('validateLocales()', () => {
    test('should throw an error if generic locale is provided', () => {
        jest.spyOn(cli_core_1.default, 'getResolvedLocales').mockReturnValue(['en']);
        const hook = new BuildHook_1.BuildHook();
        hook.$context.locales.push('en');
        expect(hook.validateLocales.bind(hook)).toThrow();
        try {
            hook.validateLocales();
        }
        catch (error) {
            // Strip error message from ANSI escape codes.
            expect((0, cli_core_1.getRawString)(error.message)).toMatch('Locale en is not supported by Amazon Alexa.');
            expect(error.properties.hint).toMatch('Alexa does not support generic locales, please specify locales in your project configuration.');
        }
    });
    test('should throw an error if a locale is not supported', () => {
        jest.spyOn(cli_core_1.default, 'getResolvedLocales').mockReturnValue(['zh']);
        const hook = new BuildHook_1.BuildHook();
        hook.$context.locales.push('zh');
        expect(hook.validateLocales.bind(hook)).toThrow();
        try {
            hook.validateLocales();
        }
        catch (error) {
            // Strip error message from ANSI escape codes.
            expect((0, cli_core_1.getRawString)(error.message)).toMatch('Locale zh is not supported by Amazon Alexa.');
        }
    });
});
describe.skip('validateModels()', () => {
    test('should call jovo.project!.validateModel() for each locale', async () => {
        const mockedValidateModel = jest
            .spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'validateModel')
            .mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        hook.$context.locales.push('en', 'de');
        await hook.validateModels();
        expect(mockedValidateModel).toBeCalledTimes(2);
    });
});
//# sourceMappingURL=BuildHook.test.js.map