"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogflowNlu = void 0;
const framework_1 = require("@jovotech/framework");
const google_auth_library_1 = require("google-auth-library");
const constants_1 = require("./constants");
class DialogflowNlu extends framework_1.NluPlugin {
    constructor(config) {
        super(config);
    }
    get projectId() {
        return this.config.serviceAccount.project_id;
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { serviceAccount: {}, defaultLocale: 'en-US' });
    }
    async processText(jovo, text) {
        if (!jovo.$session.id) {
            throw new framework_1.JovoError({
                message: `Can not send request to Dialogflow. Session-ID is missing.`,
            });
        }
        try {
            const dialogflowResponse = await this.sendTextToDialogflow({
                text,
                languageCode: jovo.$request.getLocale() || this.config.defaultLocale,
            }, jovo.$session.id);
            const nluData = {};
            const displayName = dialogflowResponse.data.queryResult.intent.displayName;
            if (displayName) {
                nluData.intent = { name: displayName };
            }
            const parameters = dialogflowResponse.data.queryResult.parameters;
            const parameterEntries = Object.entries(parameters);
            nluData.entities = parameterEntries.reduce((entityMap, [entityName, entityData]) => {
                const resolved = typeof entityData === 'string' ? entityData : entityData.toString();
                entityMap[entityName] = {
                    id: resolved,
                    resolved,
                    value: text,
                    native: entityData,
                };
                return entityMap;
            }, {});
            nluData.native = dialogflowResponse.data;
            return nluData;
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error while retrieving nlu-data from Dialogflow.', e);
            return;
        }
    }
    async sendTextToDialogflow(textInput, sessionId) {
        this.jwtClient = new google_auth_library_1.JWT({
            email: this.config.serviceAccount.client_email,
            key: this.config.serviceAccount.private_key,
            scopes: ['https://www.googleapis.com/auth/dialogflow'],
        });
        if (!this.projectId) {
            throw new framework_1.JovoError({
                message: `Can not send request to Dialogflow. Project-ID is missing.`,
            });
        }
        const path = `/v2/projects/${this.projectId}/agent/sessions/${sessionId}:detectIntent`;
        const data = {
            queryInput: {
                text: textInput,
            },
        };
        return this.jwtClient.request({
            url: `${constants_1.DIALOGFLOW_API_BASE_URL}${path}`,
            method: 'POST',
            data,
            headers: {
                Accept: 'application/json',
            },
        });
    }
}
exports.DialogflowNlu = DialogflowNlu;
//# sourceMappingURL=DialogflowNlu.js.map