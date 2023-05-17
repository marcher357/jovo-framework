"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportStatus = exports.exportSkillPackage = exports.importSkillPackage = exports.createSkillPackage = exports.createNewUploadUrl = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const utilities_1 = require("../utilities");
async function createNewUploadUrl(askProfile) {
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiCreateUploadUrl', 'ask smapi create-upload-url', askProfile);
    const { uploadUrl } = JSON.parse(stdout);
    return uploadUrl;
}
exports.createNewUploadUrl = createNewUploadUrl;
async function createSkillPackage(location, askProfile) {
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiCreateSkillPackage', ['ask smapi create-skill-package', '--full-response', `--location "${location}"`], askProfile);
    return parseImportUrl(JSON.parse(stdout));
}
exports.createSkillPackage = createSkillPackage;
async function importSkillPackage(location, skillId, askProfile) {
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiImportSkillPackage', [
        'ask smapi import-skill-package',
        '--full-response',
        `--location "${location}"`,
        `-s ${skillId}`,
    ], askProfile);
    return parseImportUrl(JSON.parse(stdout));
}
exports.importSkillPackage = importSkillPackage;
async function exportSkillPackage(skillId, stage, cwd, askProfile) {
    await (0, utilities_1.execAskCommand)('smapiExportPackage', ['ask smapi export-package', `-s ${skillId}`, `-g ${stage}`], askProfile, { cwd });
}
exports.exportSkillPackage = exportSkillPackage;
async function getImportStatus(importId, askProfile, isAsync = false) {
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiGetImportStatus', ['ask smapi get-import-status', `--import-id "${importId}"`], askProfile);
    const status = JSON.parse(stdout);
    // If --async is passed, return the status and exit, otherwise wait until the import has finished
    if (isAsync) {
        return status;
    }
    if (status.status === 'IN_PROGRESS') {
        await (0, cli_core_1.wait)(500);
        return await getImportStatus(importId, askProfile);
    }
    else if (status.status === 'FAILED') {
        throw new cli_core_1.JovoCliError({
            message: 'Errors occured while importing your skill package',
            hint: status.skill.resources.length
                ? status.skill.resources[0].errors.length
                    ? status.skill.resources[0].errors[0].message
                    : JSON.stringify(status.skill.resources, null, 2)
                : JSON.stringify(status.skill.resources, null, 2),
        });
    }
    return status;
}
exports.getImportStatus = getImportStatus;
function parseImportUrl({ headers }) {
    var _a;
    // Try to parse the import url from command result
    return (_a = headers
        .find((header) => header.key === 'location')) === null || _a === void 0 ? void 0 : _a.value.split('/').pop();
}
//# sourceMappingURL=SkillPackageManagement.js.map