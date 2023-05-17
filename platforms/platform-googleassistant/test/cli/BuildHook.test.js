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
const model_google_1 = require("@jovotech/model-google");
const BuildHook_1 = require("../../src/cli/hooks/BuildHook");
const Plugin_1 = require("../__mocks__/Plugin");
// Create mock modules. This allows us to modify the behavior for individual functions.
jest.mock('@jovotech/cli-core', () => (Object.assign(Object.assign({}, Object.assign({}, jest.requireActual('@jovotech/cli-core'))), { JovoCli: jest.fn().mockReturnValue({
        project: { hasModelFiles: jest.fn(), saveModel: jest.fn(), backupModel: jest.fn() },
    }) })));
jest.mock('@jovotech/model-google');
beforeEach(() => {
    const plugin = new Plugin_1.Plugin();
    const cli = new cli_core_1.JovoCli();
    plugin.$cli = cli;
    BuildHook_1.BuildHook.prototype['$cli'] = cli;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    BuildHook_1.BuildHook.prototype['$plugin'] = plugin;
    BuildHook_1.BuildHook.prototype['$context'] = {
        command: 'build:platform',
        locales: [],
        platforms: [],
        flags: {},
        args: {},
    };
});
afterEach(() => {
    jest.restoreAllMocks();
});
describe('install()', () => {
    test('should register events correctly', () => {
        const hook = new BuildHook_1.BuildHook();
        expect(hook['middlewareCollection']).toBeUndefined();
        hook.install();
        expect(hook['middlewareCollection']).toBeDefined();
    });
});
describe('addCliOptions()', () => {
    test('should do nothing if command is not equal to "build:platform"', () => {
        const args = { command: 'invalid', flags: {}, args: [] };
        const spiedAddClioptions = jest.spyOn(BuildHook_1.BuildHook.prototype, 'addCliOptions');
        const hook = new BuildHook_1.BuildHook();
        hook.addCliOptions(args);
        expect(spiedAddClioptions).toReturn();
        expect(args.flags).not.toHaveProperty('project-id');
    });
    test('should add "project-id" to flags', () => {
        const hook = new BuildHook_1.BuildHook();
        const args = { command: 'build:platform', flags: {}, args: [] };
        hook.addCliOptions(args);
        expect(args.flags).toHaveProperty('project-id');
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
describe('updatePluginContext()', () => {
    test('should throw an error if project-id is not set', () => {
        const hook = new BuildHook_1.BuildHook();
        hook.$context.command = 'invalidCommand';
        expect(hook.updatePluginContext.bind(hook)).toThrow();
        try {
            hook.updatePluginContext();
        }
        catch (error) {
            expect(error.message).toMatch('Could not find project ID.');
        }
        expect(hook.$context).not.toHaveProperty('project-id');
    });
    test('should set "project-id" from flags', () => {
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale').mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        hook['$context'].flags['project-id'] = '123';
        hook.updatePluginContext();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(hook.$context.googleAssistant.projectId).toBe('123');
    });
    test('should set "project-id" from config', () => {
        BuildHook_1.BuildHook.prototype['$plugin'].config.projectId = '123';
        const hook = new BuildHook_1.BuildHook();
        hook.updatePluginContext();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(hook.$context.googleAssistant.projectId).toBe('123');
    });
    test('should throw an error if "project-id" could not be found', () => {
        const hook = new BuildHook_1.BuildHook();
        expect(hook.updatePluginContext.bind(hook)).toThrow('Could not find project ID.');
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
    test('should throw an error if generic locale is required, but not provided', () => {
        jest.spyOn(cli_core_1.default, 'getResolvedLocales').mockReturnValue(['en-US']);
        const hook = new BuildHook_1.BuildHook();
        hook.$context.locales.push('en');
        expect(hook.validateLocales.bind(hook)).toThrow();
        try {
            hook.validateLocales();
        }
        catch (error) {
            // Strip error message from ANSI escape codes.
            expect((0, cli_core_1.getRawString)(error.message)).toMatch('Locale en-US requires a generic locale en.');
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
            expect((0, cli_core_1.getRawString)(error.message)).toMatch('Locale zh is not supported by Google Conversational Actions.');
        }
    });
});
describe('validateModels()', () => {
    // test.skip('should call jovo.project!.validateModel() for each locale', () => {});
});
describe.skip('buildReverse()', () => {
    test("should return if platforms don't match", async () => {
        const mockedBuildReverse = jest.spyOn(BuildHook_1.BuildHook.prototype, 'buildReverse');
        const hook = new BuildHook_1.BuildHook();
        await hook.buildReverse();
        expect(mockedBuildReverse).toReturn();
    });
    test('should reverse build model files for all platform locales, set the invocation name and save the model', async () => {
        const saveModel = jest.fn();
        const model = {
            invocation: '',
        };
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'hasModelFiles').mockReturnValue(false);
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'saveModel').mockImplementation(saveModel);
        jest.spyOn(model_google_1.JovoModelGoogle.prototype, 'exportJovoModel').mockReturnValue(model);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformInvocationName').mockReturnValue('testInvocation');
        const mockedSetDefaultLocale = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale')
            .mockReturnThis();
        const mockedGetPlatformLocales = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales')
            .mockReturnValue(['en', 'en-US']);
        const mockedGetPlatformModels = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformModels')
            .mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        await hook.buildReverse();
        expect(mockedSetDefaultLocale).toBeCalledTimes(1);
        expect(mockedGetPlatformLocales).toBeCalledTimes(1);
        expect(mockedGetPlatformModels).toBeCalledTimes(2);
        expect(mockedGetPlatformModels.mock.calls).toEqual([['en'], ['en-US']]);
        expect(saveModel).toBeCalledTimes(2);
        expect(model.invocation).toMatch('testInvocation');
        expect(saveModel.mock.calls).toEqual([
            [model, 'en'],
            [model, 'en-US'],
        ]);
    });
    test('should reverse build model files for the locale provided by --locale', async () => {
        const saveModel = jest.fn();
        const model = {
            invocation: '',
        };
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'hasModelFiles').mockReturnValue(false);
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'saveModel').mockImplementation(saveModel);
        jest.spyOn(model_google_1.JovoModelGoogle.prototype, 'exportJovoModel').mockReturnValue(model);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformInvocationName').mockReturnValue('testInvocation');
        const mockedSetDefaultLocale = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale')
            .mockReturnThis();
        const mockedGetPlatformLocales = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales')
            .mockReturnValue(['en', 'en-US']);
        const mockedGetPlatformModels = jest
            .spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformModels')
            .mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        hook.$context.flags.locale = ['en'];
        await hook.buildReverse();
        expect(mockedSetDefaultLocale).toBeCalledTimes(1);
        expect(mockedGetPlatformLocales).toBeCalledTimes(1);
        expect(mockedGetPlatformModels).toBeCalledTimes(1);
        expect(mockedGetPlatformModels).toBeCalledWith('en');
        expect(saveModel).toBeCalledTimes(1);
        expect(model.invocation).toMatch('testInvocation');
        expect(saveModel).toBeCalledWith(model, 'en');
    });
    test('should throw an error if platform models for a provided locale cannot be found', async () => {
        const model = {
            invocation: '',
        };
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale').mockReturnThis();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales').mockReturnValue(['en', 'en-US']);
        jest.spyOn(model_google_1.JovoModelGoogle.prototype, 'exportJovoModel').mockReturnValue(model);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformInvocationName').mockReturnValue('testInvocation');
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        hook.$context.flags.locale = ['de'];
        expect(hook.buildReverse.bind(hook)).rejects.toReturn();
        try {
            await hook.buildReverse();
        }
        catch (error) {
            expect((0, cli_core_1.getRawString)(error.message)).toMatch('Could not find platform models for locale: de');
        }
    });
    test('should prompt for overwriting existing model files and return upon cancel', async () => {
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'hasModelFiles').mockReturnValue(true);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale').mockReturnThis();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales').mockReturnValue(['en', 'en-US']);
        const mockedPromptOverwriteReverseBuild = jest
            .spyOn(cli_core_1.default, 'promptOverwriteReverseBuild')
            .mockReturnValue(new Promise((res) => res({
            overwrite: 'cancel',
        })));
        const mockedBuildReverse = jest.spyOn(BuildHook_1.BuildHook.prototype, 'buildReverse');
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        await hook.buildReverse();
        expect(mockedPromptOverwriteReverseBuild).toBeCalledTimes(1);
        expect(mockedBuildReverse).toReturn();
    });
    test('should prompt for overwriting existing model files and back them up accordingly', async () => {
        const backupModel = jest.fn();
        const saveModel = jest.fn();
        const model = {
            invocation: '',
        };
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'hasModelFiles').mockReturnValue(true);
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'saveModel').mockImplementation(saveModel);
        jest
            .spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'backupModel')
            .mockImplementation(backupModel);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale').mockReturnThis();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales').mockReturnValue(['en', 'en-US']);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformModels').mockReturnThis();
        jest.spyOn(model_google_1.JovoModelGoogle.prototype, 'exportJovoModel').mockReturnValue(model);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformInvocationName').mockReturnValue('testInvocation');
        const mockedPromptOverwriteReverseBuild = jest
            .spyOn(cli_core_1.default, 'promptOverwriteReverseBuild')
            .mockReturnValue(new Promise((res) => res({
            overwrite: 'backup',
        })));
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        await hook.buildReverse();
        expect(mockedPromptOverwriteReverseBuild).toBeCalledTimes(1);
        expect(backupModel).toBeCalledTimes(2);
        expect(backupModel.mock.calls).toEqual([['en'], ['en-US']]);
    });
    test('should throw an error if something went wrong while exporting the Jovo Language Model', async () => {
        jest.spyOn(BuildHook_1.BuildHook.prototype['$cli']['project'], 'hasModelFiles').mockReturnValue(false);
        jest.spyOn(model_google_1.JovoModelGoogle.prototype, 'exportJovoModel').mockReturnValue(undefined);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'setDefaultLocale').mockReturnThis();
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformLocales').mockReturnValue(['en', 'en-US']);
        jest.spyOn(BuildHook_1.BuildHook.prototype, 'getPlatformModels').mockReturnThis();
        const hook = new BuildHook_1.BuildHook();
        // Enable this plugin.
        hook.$context.platforms.push('testPlugin');
        expect(hook.buildReverse.bind(hook)).rejects.toReturn();
        try {
            await hook.buildReverse();
        }
        catch (error) {
            expect(error.message).toMatch('Something went wrong while exporting your Jovo model.');
        }
    });
});
//# sourceMappingURL=BuildHook.test.js.map