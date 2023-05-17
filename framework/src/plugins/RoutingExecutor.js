"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingExecutor = void 0;
const enums_1 = require("../enums");
const MatchingRouteNotFoundError_1 = require("../errors/MatchingRouteNotFoundError");
const MetadataStorage_1 = require("../metadata/MetadataStorage");
const RouteMatch_1 = require("./RouteMatch");
class RoutingExecutor {
    constructor(jovo) {
        this.jovo = jovo;
    }
    async execute() {
        const rankedRouteMatches = await this.getRankedRouteMatches();
        if (!rankedRouteMatches.length) {
            throw new MatchingRouteNotFoundError_1.MatchingRouteNotFoundError({
                request: this.jovo.$request,
                input: this.jovo.$input,
                state: this.jovo.$state,
            });
        }
        this.setSkipForRouteMatches(rankedRouteMatches);
        const resolvedRouteMatch = await this.resolveRoute(rankedRouteMatches);
        if (!resolvedRouteMatch) {
            throw new MatchingRouteNotFoundError_1.MatchingRouteNotFoundError({
                request: this.jovo.$request,
                input: this.jovo.$input,
                state: this.jovo.$state,
                matches: rankedRouteMatches,
            });
        }
        return {
            resolved: resolvedRouteMatch,
            matches: rankedRouteMatches,
        };
    }
    async getRankedRouteMatches() {
        var _a;
        const globalRouteMatches = await this.getRankedGlobalRouteMatches();
        if (!((_a = this.jovo.$state) === null || _a === void 0 ? void 0 : _a.length)) {
            return globalRouteMatches;
        }
        const localRouteMatches = await this.getRankedLocalRouteMatches();
        return [...localRouteMatches, ...globalRouteMatches];
    }
    setSkipForRouteMatches(rankedRouteMatches) {
        var _a, _b;
        const intentName = this.jovo.$input.getIntentName();
        const isIntentToSkipUnhandled = intentName &&
            ((_b = (_a = this.jovo.$handleRequest.config.routing) === null || _a === void 0 ? void 0 : _a.intentsToSkipUnhandled) === null || _b === void 0 ? void 0 : _b.includes(intentName));
        // if the mapped intent is an intent that is supposed to skip UNHANDLED
        if (isIntentToSkipUnhandled) {
            // set skip: true for all UNHANDLED-matches
            rankedRouteMatches.forEach((match) => {
                if (match.type === enums_1.BuiltInHandler.Unhandled) {
                    match.skip = true;
                }
            });
        }
        // find the first RouteMatch that is UNHANDLED
        const firstRouteMatchIndexWithUnhandled = rankedRouteMatches.findIndex((match) => match.type === enums_1.BuiltInHandler.Unhandled);
        // find index of the last RouteMatch that has prioritizedOverUnhandled in a reversed matches-array
        const lastReversedRouteMatchIndexWithPrioritizedOverUnhandled = rankedRouteMatches
            .slice()
            .reverse()
            .findIndex((match) => !!match.prioritizedOverUnhandled);
        // get the actual index in the non-reversed matches-array by subtracting the index from the length and 1 due to arrays starting with 0
        const lastRouteMatchIndexWithPrioritizedOverUnhandled = rankedRouteMatches.length - lastReversedRouteMatchIndexWithPrioritizedOverUnhandled - 1;
        // if no indexes were found or they're invalid, abort
        if (firstRouteMatchIndexWithUnhandled < 0 ||
            lastReversedRouteMatchIndexWithPrioritizedOverUnhandled < 0 ||
            lastRouteMatchIndexWithPrioritizedOverUnhandled < 0 ||
            lastRouteMatchIndexWithPrioritizedOverUnhandled < firstRouteMatchIndexWithUnhandled) {
            return;
        }
        // iterate all RouteMatches between indexes and set skip: true for them
        for (let i = firstRouteMatchIndexWithUnhandled; i < lastRouteMatchIndexWithPrioritizedOverUnhandled; i++) {
            rankedRouteMatches[i].skip = true;
        }
    }
    async resolveRoute(routeMatches) {
        // iterate all RouteMatches and return the first match that has no skip not set to true
        return routeMatches.find((match) => !match.skip);
    }
    isMatchingHandler(metadata, intentNames = metadata.intentNames) {
        var _a, _b;
        // do type-matching
        if ((_b = (_a = metadata.options) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b.includes(this.jovo.$input.type)) {
            return true;
        }
        // do intent-matching
        const intentName = this.jovo.$input.getIntentName();
        return ((intentName && intentNames.includes(intentName)) ||
            intentNames.includes(enums_1.BuiltInHandler.Unhandled));
    }
    async getRankedGlobalRouteMatches() {
        const globalRouteMatches = await this.getGlobalRouteMatches();
        return globalRouteMatches.sort(this.compareRouteMatchRanking);
    }
    isMatchingGlobalHandler(handlerMetadata, componentMetadata) {
        const isGlobal = handlerMetadata.options.global ||
            componentMetadata.isGlobal ||
            !!handlerMetadata.globalIntentNames.length;
        // if neither handler nor component nor any intent is global, abort
        if (!isGlobal) {
            return false;
        }
        // if the component is global, all intent names are global, otherwise only use global intent names
        // the reason is, that a handler can not be locally called anyways if the component is global
        const intentNames = componentMetadata.isGlobal
            ? handlerMetadata.intentNames
            : handlerMetadata.globalIntentNames;
        return this.isMatchingHandler(handlerMetadata, intentNames);
    }
    async getGlobalRouteMatches() {
        const routeMatches = [];
        const componentNodes = Array.from(this.jovo.$handleRequest.componentTree);
        // iterate all trees in the ComponentTree, for of used due to async methods
        for (const node of componentNodes) {
            // create a map-callback for the given node's path
            const handlerMetadataToRouteMatchMapper = this.createHandlerMetadataToRouteMatchMapper(node.path);
            const relatedHandlerMetadata = MetadataStorage_1.MetadataStorage.getInstance().getMergedHandlerMetadataOfComponent(node.metadata.target);
            for (const metadata of relatedHandlerMetadata) {
                // if the conditions are no fulfilled, do not add the handler
                if (!this.isMatchingGlobalHandler(metadata, node.metadata) ||
                    !(await this.areHandlerConditionsFulfilled(metadata))) {
                    continue;
                }
                routeMatches.push(handlerMetadataToRouteMatchMapper(metadata));
            }
        }
        return routeMatches;
    }
    async getRankedLocalRouteMatches() {
        const routeMatches = await this.getLocalRouteMatches();
        return routeMatches.sort((match, otherMatch) => {
            // if the path is different, ignore
            if (match.path !== otherMatch.path) {
                return 0;
            }
            return this.compareRouteMatchRanking(match, otherMatch);
        });
    }
    isMatchingLocalHandler(metadata, subState) {
        var _a, _b;
        // if a subState is passed, make sure the handler has exactly the same subState, otherwise make sure the handler has no subState
        return ((subState ? ((_a = metadata.options) === null || _a === void 0 ? void 0 : _a.subState) === subState : !((_b = metadata.options) === null || _b === void 0 ? void 0 : _b.subState)) &&
            this.isMatchingHandler(metadata));
    }
    async getLocalRouteMatches() {
        var _a;
        if (!((_a = this.jovo.$state) === null || _a === void 0 ? void 0 : _a.length)) {
            return [];
        }
        const routeMatches = [];
        for (let stackIndex = this.jovo.$state.length - 1; stackIndex >= 0; stackIndex--) {
            const stackItem = this.jovo.$state[stackIndex];
            const currentComponentPath = stackItem.component.split('.');
            let subState = stackItem.subState;
            // get the current node
            let node = this.jovo.$handleRequest.componentTree.getNodeAtOrFail(currentComponentPath);
            // loop all nodes and their parent's as long as root is reached
            while (node) {
                // create a map-callback for the given node's path
                const handlerMetadataToRouteMatchMapper = this.createHandlerMetadataToRouteMatchMapper(node.path);
                const relatedHandlerMetadata = MetadataStorage_1.MetadataStorage.getInstance().getMergedHandlerMetadataOfComponent(node.metadata.target);
                for (const metadata of relatedHandlerMetadata) {
                    // if the conditions are no fulfilled, do not add the handler
                    if (!this.isMatchingLocalHandler(metadata, subState) ||
                        !(await this.areHandlerConditionsFulfilled(metadata))) {
                        continue;
                    }
                    routeMatches.push(handlerMetadataToRouteMatchMapper(metadata, stackIndex));
                }
                // if a subState is set, make sure to check the same node without subState before moving to the parent
                if (subState) {
                    subState = undefined;
                }
                else {
                    node = node.parent;
                }
            }
        }
        return routeMatches;
    }
    async areHandlerConditionsFulfilled(metadata) {
        var _a, _b, _c, _d, _e, _f, _g;
        const isPlatformSupported = !((_b = (_a = metadata.options) === null || _a === void 0 ? void 0 : _a.platforms) === null || _b === void 0 ? void 0 : _b.length) ||
            ((_d = (_c = metadata.options) === null || _c === void 0 ? void 0 : _c.platforms) === null || _d === void 0 ? void 0 : _d.includes(this.jovo.$platform.outputTemplateConverterStrategy.platformName));
        const isConditionFulfilled = !((_e = metadata.options) === null || _e === void 0 ? void 0 : _e.if) || (await ((_g = (_f = metadata.options) === null || _f === void 0 ? void 0 : _f.if) === null || _g === void 0 ? void 0 : _g.call(_f, this.jovo)));
        return isPlatformSupported && isConditionFulfilled;
    }
    createHandlerMetadataToRouteMatchMapper(path) {
        return (metadata, stackIndex) => {
            return new RouteMatch_1.RouteMatch(metadata, path, stackIndex);
        };
    }
    compareRouteMatchRanking(match, otherMatch) {
        const matchIsUnhandled = match.metadata.intentNames.includes(enums_1.BuiltInHandler.Unhandled);
        const otherMatchIsUnhandled = otherMatch.metadata.intentNames.includes(enums_1.BuiltInHandler.Unhandled);
        if (match.stackIndex && otherMatch.stackIndex) {
            if (match.stackIndex < otherMatch.stackIndex) {
                // if otherMatch is higher in the stack, it will take precedence except when it is UNHANDLED and match is prioritizedOverUnhandled.
                if (otherMatchIsUnhandled && match.prioritizedOverUnhandled) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else if (match.stackIndex > otherMatch.stackIndex) {
                // same thing in the other direction. If match is higher in the stack, it will take precedence.
                if (matchIsUnhandled && otherMatch.prioritizedOverUnhandled) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        }
        if (matchIsUnhandled && !otherMatchIsUnhandled) {
            return 1;
        }
        else if (!matchIsUnhandled && otherMatchIsUnhandled) {
            return -1;
        }
        return otherMatch.score - match.score;
    }
}
exports.RoutingExecutor = RoutingExecutor;
//# sourceMappingURL=RoutingExecutor.js.map