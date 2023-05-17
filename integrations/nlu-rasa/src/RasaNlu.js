"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RasaNlu = void 0;
const framework_1 = require("@jovotech/framework");
class RasaNlu extends framework_1.NluPlugin {
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { serverUrl: 'http://localhost:5005', serverPath: '/model/parse', alternativeIntents: { maxAlternatives: 15, confidenceCutoff: 0.0 } });
    }
    async processText(jovo, text) {
        try {
            const rasaResponse = await this.sendTextToRasaServer(text);
            return {
                intent: {
                    name: rasaResponse.data.intent.name,
                    confidence: rasaResponse.data.intent.confidence,
                },
                alternativeIntents: this.mapAlternativeIntents(rasaResponse.data.intent_ranking),
                entities: this.getEntityMapFromResponse(rasaResponse.data),
                native: rasaResponse.data,
            };
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error while retrieving nlu-data from Rasa-server: ', e);
            return;
        }
    }
    sendTextToRasaServer(text, config) {
        return framework_1.axios.post(`${this.config.serverUrl}${this.config.serverPath}`, { text }, config);
    }
    mapAlternativeIntents(allIntents) {
        // remove first element, because its the classified intent
        const alternativeIntents = allIntents.slice(1);
        return alternativeIntents
            .filter((a) => a.confidence > this.config.alternativeIntents.confidenceCutoff)
            .slice(0, this.config.alternativeIntents.maxAlternatives);
    }
    getEntityMapFromResponse(response) {
        return response.entities.reduce((entityMap, entity) => {
            let entityName = entity.entity;
            // roles can distinguish entities of the same type e.g. departure and destination in
            // a travel use case and should therefore be preferred as entity name
            if (entity.role) {
                entityName = entity.role;
            }
            entityMap[entityName] = {
                id: entity.value,
                resolved: entity.value,
                value: response.text.substring(entity.start, entity.end),
                native: entity,
            };
            return entityMap;
        }, {});
    }
}
exports.RasaNlu = RasaNlu;
//# sourceMappingURL=RasaNlu.js.map