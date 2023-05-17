"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptListForAlexaSkill = exports.execAskCommand = exports.copyFiles = exports.getAskError = exports.getACValidationErrorHint = exports.prepareSkillList = exports.checkForAskCli = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const lodash_get_1 = __importDefault(require("lodash.get"));
const path_1 = require("path");
/**
 * Checks if ask cli is installed.
 */
async function checkForAskCli() {
    try {
        const { stdout } = await (0, cli_core_1.execAsync)('ask --version');
        const majorVersion = stdout[0];
        if (parseInt(majorVersion) < 2) {
            throw new cli_core_1.JovoCliError({
                message: 'Jovo CLI requires ASK CLI @v2 or above.',
                module: 'AlexaCli',
                hint: 'Please update your ASK CLI using "npm install ask-cli -g".',
            });
        }
    }
    catch (error) {
        if (!(0, cli_core_1.isJovoCliError)(error)) {
            throw new cli_core_1.JovoCliError({
                message: 'Jovo CLI requires ASK CLI',
                module: 'AlexaCli',
                hint: 'Install the ASK CLI with "npm install ask-cli -g".',
                learnMore: 'https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html',
            });
        }
        throw error;
    }
}
exports.checkForAskCli = checkForAskCli;
/**
 * Generates a choice list out of an ASK skill list.
 * @param askSkillList - List of Alexa Skills returned by the ASK CLI.
 */
function prepareSkillList(askSkillList) {
    const choices = [];
    for (const item of askSkillList.skills) {
        const key = Object.keys(item.nameByLocale)[0];
        let message = item.nameByLocale[key];
        const stage = item.stage === 'development' ? 'dev' : item.stage;
        message +=
            ` ${stage === 'live' ? chalk_1.default.green(stage) : chalk_1.default.blue(stage)} ` +
                `- ${item.lastUpdated.substr(0, 10)}` +
                ` ${chalk_1.default.grey(item.skillId)}`;
        choices.push({
            title: message,
            value: {
                skillId: item.skillId,
                stage: item.stage,
            },
        });
    }
    return choices;
}
exports.prepareSkillList = prepareSkillList;
function getACValidationErrorHint(errors) {
    return errors.reduce((output, error) => {
        return [
            cli_core_1.Log.info(output, { dry: true }),
            cli_core_1.Log.info(chalk_1.default.dim(`[${error.code.code}]`), {
                dry: true,
                newLine: false,
            }),
            cli_core_1.Log.info(error.message, { dry: true, newLine: false }),
            error.uri
                ? cli_core_1.Log.info(chalk_1.default.dim(`in ${error.uri.split('/').pop()}`), {
                    dry: true,
                    newLine: false,
                })
                : undefined,
            error.loc
                ? cli_core_1.Log.info(chalk_1.default.dim(`(l. ${error.loc.begin.line})`), {
                    dry: true,
                    newLine: false,
                })
                : undefined,
        ].join(' ');
    }, '');
}
exports.getACValidationErrorHint = getACValidationErrorHint;
function getAskError(method, stderr) {
    const module = 'AlexaCli';
    const splitter = '[Error]: ';
    const errorIndex = stderr.indexOf(splitter);
    if (errorIndex > -1) {
        const errorString = (0, cli_core_1.getRawString)(stderr.substring(errorIndex + splitter.length));
        const parsedError = JSON.parse(errorString);
        const payload = (0, lodash_get_1.default)(parsedError, 'detail.response', parsedError);
        const message = payload.message;
        let violations = '';
        if (payload.violations) {
            for (const violation of payload.violations) {
                violations += violation.message;
            }
        }
        if (payload.detail) {
            violations = payload.detail.response.message;
        }
        return new cli_core_1.JovoCliError({ message: `${method}: ${message}`, module, details: violations });
    }
    else {
        // Try parsing for alternative error message.
        let i, pathRegex;
        // Depending on the type of error message, try using different regular expressions to parse the actual error message.
        if (stderr.includes('CliFileNotFoundError')) {
            i = stderr.indexOf('CliFileNotFoundError');
            pathRegex = /File (\/.*\/)+(.*) not exists\./g;
        }
        else if (stderr.includes('ENOENT')) {
            i = stderr.indexOf('ENOENT');
            pathRegex = /'(\/.*\/)*(.*)'/g;
        }
        else {
            return new cli_core_1.JovoCliError({ message: stderr, module });
        }
        // Check for different error messages, if a file cannot be found.
        const parsedError = stderr.substring(i);
        const match = pathRegex.exec(parsedError);
        // File-specific error messages
        if (match && match.length > 2) {
            if (match[2] === 'cli_config') {
                return new cli_core_1.JovoCliError({
                    message: `ASK CLI is unable to find your configuration file at ${match[1]}.`,
                    module,
                    hint: "Please configure at least one ask profile using the command 'ask configure'.",
                });
            }
            return new cli_core_1.JovoCliError({
                message: `ASK CLI is unable to find your ${match[2]} at ${match[1]}.`,
                module,
                hint: 'If this error persists, try rebuilding your platform folder using "jovo build:platform alexa".',
            });
        }
    }
    return new cli_core_1.JovoCliError({ message: stderr, module });
}
exports.getAskError = getAskError;
function copyFiles(src, dest) {
    if (!(0, fs_1.existsSync)(dest)) {
        (0, fs_1.mkdirSync)(dest, { recursive: true });
    }
    for (const file of (0, fs_1.readdirSync)(src)) {
        const srcFile = (0, path_1.join)(src, file);
        const destFile = (0, path_1.join)(dest, file);
        if ((0, fs_1.statSync)(srcFile).isDirectory()) {
            copyFiles(srcFile, destFile);
        }
        else {
            (0, fs_1.copyFileSync)(srcFile, destFile);
        }
    }
}
exports.copyFiles = copyFiles;
async function execAskCommand(id, cmd, askProfile, execOptions) {
    if (!Array.isArray(cmd)) {
        cmd = [cmd];
    }
    if (askProfile) {
        cmd.push(`-p ${askProfile}`);
    }
    try {
        return await (0, cli_core_1.execAsync)(cmd.join(' '), execOptions);
    }
    catch (error) {
        throw getAskError(id, error.stderr || error.message);
    }
}
exports.execAskCommand = execAskCommand;
/**
 * Prompt for a project, depending on provided choices.
 * @param choices - Array of choices (projects) to choose from.
 */
async function promptListForAlexaSkill(choices) {
    return await (0, cli_core_1.prompt)({
        name: 'skill',
        type: 'select',
        message: 'Select your project:',
        choices,
    }, {
        onCancel() {
            process.exit();
        },
    });
}
exports.promptListForAlexaSkill = promptListForAlexaSkill;
//# sourceMappingURL=utilities.js.map