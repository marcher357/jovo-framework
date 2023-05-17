"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentTree = void 0;
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const ComponentTreeNode_1 = require("./ComponentTreeNode");
const ComponentNotFoundError_1 = require("./errors/ComponentNotFoundError");
const DuplicateChildComponentsError_1 = require("./errors/DuplicateChildComponentsError");
const InvalidComponentTreeBuiltError_1 = require("./errors/InvalidComponentTreeBuiltError");
const ComponentMetadata_1 = require("./metadata/ComponentMetadata");
const MetadataStorage_1 = require("./metadata/MetadataStorage");
/**
 * @example Structure of ComponentTree
 * {
 * "tree": {
 *   "GlobalComponent": {
 *     "path": [
 *       "GlobalComponent"
 *     ],
 *     "metadata": {
 *       "options": {
 *         "global": true
 *       }
 *     }
 *   },
 *   "RootComponent": {
 *     "path": [
 *       "RootComponent"
 *     ],
 *     "metadata": {
 *       "options": {
 *         "components": [
 *           "NestedComponent"
 *         ]
 *       }
 *     },
 *     "children": {
 *       "NestedComponent": {
 *         "path": [
 *           "RootComponent",
 *           "NestedComponent"
 *         ],
 *         "metadata": {
 *           "options": {}
 *         },
 *         "parent": "RootComponent"
 *       }
 *     }
 *   }
 * }
 *}
 */
class ComponentTree {
    // returns a map-callback that will create a ComponentTreeNode for the given component (constructor or declaration)
    static createComponentToNodeMapper(componentTree, parent) {
        return (component) => {
            var _a;
            const componentConstructor = typeof component === 'function' ? component : component.component;
            // get the metadata of the component
            const componentMetadata = MetadataStorage_1.MetadataStorage.getInstance().getMergedComponentMetadata(componentConstructor);
            // merge the options of the related metadata with the options of the given options (only set when passing a declaration)
            const mergedComponentOptions = (0, lodash_merge_1.default)({}, (componentMetadata === null || componentMetadata === void 0 ? void 0 : componentMetadata.options) || {}, typeof component === 'function' ? {} : component.options || {});
            const componentName = ((_a = componentMetadata === null || componentMetadata === void 0 ? void 0 : componentMetadata.options) === null || _a === void 0 ? void 0 : _a.name) || componentConstructor.name;
            // return a new node with metadata, that is constructed from the constructor and the merged component options, as well as additional data
            return new ComponentTreeNode_1.ComponentTreeNode(componentTree, {
                metadata: new ComponentMetadata_1.ComponentMetadata(componentConstructor, mergedComponentOptions),
                parent,
                children: mergedComponentOptions.components,
                path: (parent === null || parent === void 0 ? void 0 : parent.path) ? [...parent.path, componentName] : [componentName],
            });
        };
    }
    // returns a reduce-callback that will create a Tree from the components it's called on
    static createComponentsToTreeReducer(componentTree, parent) {
        return (tree, component) => {
            const node = ComponentTree.createComponentToNodeMapper(componentTree, parent)(component);
            if (!tree[node.name]) {
                tree[node.name] = node;
            }
            else {
                componentTree.initialBuildErrors.push(new DuplicateChildComponentsError_1.DuplicateChildComponentsError(node.name, (parent === null || parent === void 0 ? void 0 : parent.name) || 'Root'));
            }
            return tree;
        };
    }
    constructor(...components) {
        this.initialBuildErrors = [];
        this.tree = this.buildTreeForComponents(...components);
    }
    [Symbol.iterator]() {
        let index = -1;
        const nodes = [];
        this.iterateNodes(Object.values(this.tree), (node) => {
            nodes.push(node);
        });
        return {
            next: () => ({ value: nodes[++index], done: !(index in nodes) }),
        };
    }
    async initialize() {
        if (this.initialBuildErrors.length) {
            throw new InvalidComponentTreeBuiltError_1.InvalidComponentTreeBuiltError(this.initialBuildErrors);
        }
    }
    add(...components) {
        const tree = this.buildTreeForComponents(...components);
        for (const key in tree) {
            if (tree.hasOwnProperty(key)) {
                if (this.tree[key]) {
                    throw new DuplicateChildComponentsError_1.DuplicateChildComponentsError(key, 'Root');
                }
                this.tree[key] = tree[key];
            }
        }
    }
    getNodeAt(path) {
        return (0, lodash_get_1.default)(this.tree, path.join('.children.'));
    }
    getNodeAtOrFail(path) {
        const node = this.getNodeAt(path);
        if (!node) {
            throw new ComponentNotFoundError_1.ComponentNotFoundError(path);
        }
        return node;
    }
    /**
     * Find a node that matches the componentName relative to the node at relativeTo
     */
    getNodeRelativeTo(componentName, relativeTo = []) {
        var _a;
        const currentComponentNode = this.getNodeAt(relativeTo);
        const rootComponentNode = this.tree[componentName];
        const childComponentNode = (_a = currentComponentNode === null || currentComponentNode === void 0 ? void 0 : currentComponentNode.children) === null || _a === void 0 ? void 0 : _a[componentName];
        return childComponentNode || rootComponentNode;
    }
    getNodeRelativeToOrFail(componentName, relativeTo = []) {
        const componentNode = this.getNodeRelativeTo(componentName, relativeTo);
        if (!componentNode) {
            throw new ComponentNotFoundError_1.ComponentNotFoundError([...relativeTo, componentName]);
        }
        return componentNode;
    }
    forEach(callback) {
        this.iterateNodes(Object.values(this.tree), callback);
    }
    iterateNodes(nodes, callback) {
        nodes.forEach((node) => {
            callback(node);
            const childNodes = Object.values(node.children || {});
            if (childNodes.length) {
                this.iterateNodes(childNodes, callback);
            }
        });
    }
    buildTreeForComponents(...components) {
        return components.reduce(ComponentTree.createComponentsToTreeReducer(this), {});
    }
}
exports.ComponentTree = ComponentTree;
//# sourceMappingURL=ComponentTree.js.map