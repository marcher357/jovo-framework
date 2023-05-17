"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const utilities_1 = require("./utilities");
describe('registering components', () => {
    let app;
    function expectNodeMetadataAtToEqual(path, equals) {
        const node = app.componentTree.getNodeAt(path);
        expect(node === null || node === void 0 ? void 0 : node.metadata).toEqual(equals);
    }
    const metadataStorage = src_1.MetadataStorage.getInstance();
    beforeEach(() => {
        app = new src_1.App();
        metadataStorage.clearAll();
    });
    test('via BaseComponent-constructor and undecorated component', () => {
        app.use(utilities_1.EmptyComponent);
        expectNodeMetadataAtToEqual(['EmptyComponent'], new src_1.ComponentMetadata(utilities_1.EmptyComponent, {}));
    });
    describe('via ComponentPlugin', () => {
        test('no config passed', () => {
            app.use(new utilities_1.ExampleComponentPlugin());
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {}));
        });
        test('config passed', () => {
            app.use(new utilities_1.ExampleComponentPlugin({ component: { text: 'edited' } }));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {
                config: {
                    text: 'edited',
                },
            }));
        });
    });
    describe('via ComponentDeclaration-instance', () => {
        test('no options passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {}));
        });
        test('options with config passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent, {
                config: {
                    text: 'edited',
                },
            }));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {
                config: {
                    text: 'edited',
                },
            }));
        });
        test('options with name passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent, {
                name: 'NewComponentName',
            }));
            expectNodeMetadataAtToEqual(['NewComponentName'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, { name: 'NewComponentName' }));
        });
        test('options with components passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent, { components: [utilities_1.EmptyComponent] }));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, { components: [utilities_1.EmptyComponent] }));
        });
    });
    describe('via ComponentDeclaration-object', () => {
        test('no options passed', () => {
            app.use({ component: utilities_1.ExampleComponent });
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {}));
        });
        test('options with config passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent, {
                config: {
                    text: 'edited',
                },
            }));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {
                config: {
                    text: 'edited',
                },
            }));
        });
        test('options with components passed', () => {
            app.use(new src_1.ComponentDeclaration(utilities_1.ExampleComponent, { components: [utilities_1.EmptyComponent] }));
            expectNodeMetadataAtToEqual(['ExampleComponent'], new src_1.ComponentMetadata(utilities_1.ExampleComponent, {
                components: [utilities_1.EmptyComponent],
            }));
        });
    });
    describe('via @Component-decorator and useComponents', () => {
        test('no config passed', () => {
            let DecoratedComponent = class DecoratedComponent extends src_1.BaseComponent {
                getDefaultConfig() {
                    return {};
                }
            };
            DecoratedComponent = __decorate([
                (0, src_1.Component)()
            ], DecoratedComponent);
            app.use(DecoratedComponent);
            expectNodeMetadataAtToEqual(['DecoratedComponent'], new src_1.ComponentMetadata(DecoratedComponent, {}));
        });
        test('config passed in decorator', () => {
            let DecoratedComponent = class DecoratedComponent extends src_1.BaseComponent {
                getDefaultConfig() {
                    return { test: false };
                }
            };
            DecoratedComponent = __decorate([
                (0, src_1.Component)({
                    config: {
                        test: true,
                    },
                })
            ], DecoratedComponent);
            app.use(DecoratedComponent);
            expectNodeMetadataAtToEqual(['DecoratedComponent'], new src_1.ComponentMetadata(DecoratedComponent, {
                config: {
                    test: true,
                },
            }));
        });
        test('config passed in decorator and declaration', () => {
            let DecoratedComponent = class DecoratedComponent extends src_1.BaseComponent {
                getDefaultConfig() {
                    return { test: 'default' };
                }
            };
            DecoratedComponent = __decorate([
                (0, src_1.Component)({
                    config: {
                        test: 'decorator',
                    },
                })
            ], DecoratedComponent);
            app.use(new src_1.ComponentDeclaration(DecoratedComponent, { config: { test: 'declaration' } }));
            expectNodeMetadataAtToEqual(['DecoratedComponent'], new src_1.ComponentMetadata(DecoratedComponent, {
                config: {
                    test: 'declaration',
                },
            }));
        });
    });
});
//# sourceMappingURL=Component.test.js.map