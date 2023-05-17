"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanityCms = void 0;
const framework_1 = require("@jovotech/framework");
const JovoSanity_1 = require("./JovoSanity");
class SanityCms extends framework_1.Plugin {
    getDefaultConfig() {
        return {
            client: {
                projectId: '',
                dataset: '',
                apiVersion: new Date().toISOString().split('T')[0],
                token: '',
                useCdn: true,
            },
            queries: {},
        };
    }
    install(app) {
        app.middlewareCollection.use('request.start', this.retrieveSanityData.bind(this));
        if (!this.config.client.projectId) {
            throw new framework_1.JovoError({
                message: 'projectId has to be set',
                hint: 'You can find your api key on https://manage.sanity.io',
                learnMore: 'https://www.sanity.io/docs/connect-your-content',
            });
        }
        if (!this.config.client.dataset) {
            throw new framework_1.JovoError({
                message: 'dataset has to bet set',
                hint: 'You can find your baseId on https://manage.sanity.io',
                learnMore: 'https://www.sanity.io/docs/connect-your-content',
            });
        }
    }
    async retrieveSanityData(jovo) {
        let queryKeys = [];
        if (this.config.autoLoad) {
            queryKeys = Object.keys(this.config.queries).filter((x) => this.config.autoLoad.includes(x));
        }
        else {
            queryKeys = Object.keys(this.config.queries);
        }
        jovo.$sanity = new JovoSanity_1.JovoSanity(this, jovo);
        if (queryKeys.length > 0) {
            await jovo.$sanity.load(queryKeys);
        }
    }
}
exports.SanityCms = SanityCms;
//# sourceMappingURL=SanityCms.js.map