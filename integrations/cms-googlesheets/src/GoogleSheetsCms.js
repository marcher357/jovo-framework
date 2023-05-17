"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsCms = void 0;
const framework_1 = require("@jovotech/framework");
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
class GoogleSheetsCms extends framework_1.Plugin {
    constructor(config) {
        super(config);
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, this.getInitConfig()), { sheets: {} });
    }
    getInitConfig() {
        return { serviceAccount: {}, spreadsheetId: '<YOUR-SPREADSHEET-ID>' };
    }
    install(app) {
        app.middlewareCollection.use('request.start', this.retrieveSpreadsheetData.bind(this));
    }
    async initialize() {
        this.jwt = await this.initializeJWT();
    }
    async retrieveSpreadsheetData(jovo) {
        for (const [sheetName, sheet] of Object.entries(this.config.sheets)) {
            // Cache cms data, if not configured otherwise
            if ((this.config.caching !== false || sheet.config.caching !== false) &&
                jovo.$cms[sheetName]) {
                continue;
            }
            const spreadsheetId = sheet.config.spreadsheetId || this.config.spreadsheetId;
            if (!spreadsheetId) {
                throw new framework_1.JovoError({
                    message: `spreadsheetId has to be set for ${sheetName}`,
                    learnMore: 'https://www.jovo.tech/docs/cms/google-sheets#configuration',
                });
            }
            if (!sheet.config.range) {
                throw new framework_1.JovoError({
                    message: `range has to be set for ${sheetName}`,
                    learnMore: 'https://www.jovo.tech/docs/cms/google-sheets#configuration',
                });
            }
            try {
                const sheets = googleapis_1.google.sheets({ version: 'v4', auth: this.jwt });
                const response = await sheets.spreadsheets.values.get({
                    range: `${sheetName}!${sheet.config.range}`,
                    spreadsheetId,
                });
                // TODO: Data can be undefined?
                const parsed = sheet.parse(response.data.values, jovo);
                jovo.$cms[sheetName] = parsed;
            }
            catch (error) {
                throw new framework_1.JovoError({ message: error.message });
            }
        }
    }
    async initializeJWT() {
        if (!this.config.serviceAccount) {
            throw new framework_1.JovoError({
                message: 'serviceAccount has to bet set',
                learnMore: 'https://www.jovo.tech/docs/cms/google-sheets#configuration',
            });
        }
        try {
            const jwt = new google_auth_library_1.JWT({
                email: this.config.serviceAccount.client_email,
                key: this.config.serviceAccount.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            await jwt.authorize();
            return jwt;
        }
        catch (error) {
            throw new framework_1.JovoError({ message: error.message });
        }
    }
}
exports.GoogleSheetsCms = GoogleSheetsCms;
//# sourceMappingURL=GoogleSheetsCms.js.map