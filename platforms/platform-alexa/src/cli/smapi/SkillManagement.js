"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkillStatus = exports.listSkills = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const utilities_1 = require("../utilities");
async function listSkills(askProfile) {
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiListSkillsForVendor', 'ask smapi list-skills-for-vendor', askProfile);
    return JSON.parse(stdout);
}
exports.listSkills = listSkills;
async function getSkillStatus(skillId, askProfile) {
    const cmd = ['ask smapi get-skill-status', `-s ${skillId}`];
    const { stdout } = await (0, utilities_1.execAskCommand)('smapiGetSkillStatus', cmd, askProfile);
    const response = JSON.parse(stdout);
    if (response.manifest) {
        const { status, errors } = response.manifest.lastUpdateRequest;
        if (status === 'IN_PROGRESS') {
            await (0, cli_core_1.wait)(500);
            await getSkillStatus(skillId, askProfile);
        }
        else if (status === 'FAILED') {
            throw new cli_core_1.JovoCliError({
                message: 'Errors occured while validating your skill package',
                hint: errors.reduce((output, error) => {
                    return output + error.message;
                }, ''),
            });
        }
    }
    if (response.interactionModel) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values = Object.values(response.interactionModel);
        for (const model of values) {
            const status = model.lastUpdateRequest.status;
            if (status === 'IN_PROGRESS') {
                await (0, cli_core_1.wait)(1000);
                await getSkillStatus(skillId, askProfile);
            }
        }
    }
}
exports.getSkillStatus = getSkillStatus;
//# sourceMappingURL=SkillManagement.js.map