"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentTreeNode = void 0;
const ComponentTree_1 = require("./ComponentTree");
const enums_1 = require("./enums");
const HandlerNotFoundError_1 = require("./errors/HandlerNotFoundError");
const EXECUTE_HANDLER_MIDDLEWARE = 'event.ComponentTreeNode.executeHandler';
class ComponentTreeNode {
    constructor(componentTree, { path, metadata, parent, children }) {
        this.path = path.slice();
        this.metadata = metadata;
        if (parent) {
            this.parent = parent;
        }
        if (children === null || children === void 0 ? void 0 : children.length) {
            this.children = children.reduce(ComponentTree_1.ComponentTree.createComponentsToTreeReducer(componentTree, this), {});
        }
    }
    get isRootNode() {
        return !this.parent;
    }
    get name() {
        var _a;
        return ((_a = this.metadata.options) === null || _a === void 0 ? void 0 : _a.name) || this.metadata.target.name;
    }
    async executeHandler({ jovo, handler = enums_1.BuiltInHandler.Start, callArgs, }) {
        const componentInstance = new this.metadata.target(jovo, this.metadata.options);
        try {
            if (!componentInstance[handler]) {
                throw new HandlerNotFoundError_1.HandlerNotFoundError(componentInstance.constructor.name, handler.toString());
            }
            // Run any middlewares that are attached to 'event.ComponentTreeNode.executeHandler'
            await jovo.$handleRequest.middlewareCollection.run(EXECUTE_HANDLER_MIDDLEWARE, jovo, {
                component: this.name,
                handler,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await componentInstance[handler](...(callArgs || []));
        }
        catch (e) {
            return jovo.$app.handleError(e, jovo);
        }
    }
    toJSON() {
        var _a;
        return Object.assign(Object.assign({}, this), { parent: this.parent ? this.parent.name : undefined, metadata: Object.assign(Object.assign({}, this.metadata), { options: Object.assign(Object.assign({}, this.metadata.options), { components: (_a = this.metadata.options.components) === null || _a === void 0 ? void 0 : _a.map((component) => typeof component === 'function'
                        ? component.name
                        : Object.assign(Object.assign({}, component), { component: component.component.name })) }) }) });
    }
}
exports.ComponentTreeNode = ComponentTreeNode;
//# sourceMappingURL=ComponentTreeNode.js.map