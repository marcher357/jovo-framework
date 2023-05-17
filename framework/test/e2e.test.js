"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const utilities_1 = require("./utilities");
describe('e2e', () => {
    const metadataStorage = src_1.MetadataStorage.getInstance();
    beforeEach(() => {
        metadataStorage.clearAll();
    });
    test('Simple', async () => {
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.InputType.Launch]() {
                return this.$send('Hello world');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Launch,
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'Hello world',
            },
        ]);
    });
    test('UNHANDLED', async () => {
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Unhandled]() {
                return this.$send('Unhandled');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'IntentA',
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'Unhandled',
            },
        ]);
    });
    test('Global Intent from other Component', async () => {
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Unhandled]() {
                return this.$send('Unhandled');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        let ComponentA = class ComponentA extends src_1.BaseComponent {
            GlobalIntentA() {
                return this.$send('GlobalIntentA');
            }
        };
        ComponentA = __decorate([
            (0, src_1.Component)({ global: true })
        ], ComponentA);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent, ComponentA],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'GlobalIntentA',
            },
            session: {
                state: [
                    {
                        component: 'AnyOtherComponent',
                    },
                ],
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'GlobalIntentA',
            },
        ]);
    });
    test('Handle PrioritizedOverUnhandled', async () => {
        let ComponentA = class ComponentA extends src_1.BaseComponent {
            async START() {
                return;
            }
            async intentA() {
                return this.$send('intentA');
            }
            async intentB() {
                return this.$send('intentB');
            }
        };
        __decorate([
            (0, src_1.Global)(),
            (0, src_1.Intents)('IntentA'),
            (0, src_1.PrioritizedOverUnhandled)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ComponentA.prototype, "intentA", null);
        __decorate([
            (0, src_1.Intents)('IntentB'),
            (0, src_1.PrioritizedOverUnhandled)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ComponentA.prototype, "intentB", null);
        ComponentA = __decorate([
            (0, src_1.Component)()
        ], ComponentA);
        let ComponentB = class ComponentB extends src_1.BaseComponent {
            async START() {
                return;
            }
            async UNHANDLED() {
                return this.$send('UNHANDLED');
            }
        };
        ComponentB = __decorate([
            (0, src_1.Component)()
        ], ComponentB);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [ComponentA, ComponentB],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'IntentB',
            },
            session: {
                data: {
                    state: [
                        {
                            component: 'ComponentA',
                        },
                        {
                            component: 'ComponentB',
                        },
                    ],
                },
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'intentB',
            },
        ]);
    });
    test('Rank global Intent over Unhandled, without specific order of components', async () => {
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Unhandled]() {
                return this.$send('Unhandled');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Global)(),
            (0, src_1.Component)()
        ], GlobalComponent);
        let ComponentA = class ComponentA extends src_1.BaseComponent {
            IntentA() {
                return this.$send('IntentA');
            }
        };
        __decorate([
            (0, src_1.Intents)('IntentA'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ComponentA.prototype, "IntentA", null);
        ComponentA = __decorate([
            (0, src_1.Global)(),
            (0, src_1.Component)()
        ], ComponentA);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent, ComponentA],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'IntentA',
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'IntentA',
            },
        ]);
        const app2 = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [ComponentA, GlobalComponent],
        });
        await app2.initialize();
        const server2 = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'IntentA',
            },
        });
        await app2.handle(server2);
        expect(server2.response.output).toEqual([
            {
                message: 'IntentA',
            },
        ]);
    });
    test('Rank global intent with @If higher than same global intent in other component ', async () => {
        let ComponentA = class ComponentA extends src_1.BaseComponent {
            IntentA() {
                return this.$send('ComponentA.IntentA');
            }
        };
        __decorate([
            (0, src_1.Intents)('IntentA'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ComponentA.prototype, "IntentA", null);
        ComponentA = __decorate([
            (0, src_1.Global)(),
            (0, src_1.Component)()
        ], ComponentA);
        let ComponentB = class ComponentB extends src_1.BaseComponent {
            IntentA() {
                return this.$send('ComponentB.IntentA');
            }
        };
        __decorate([
            (0, src_1.Intents)('IntentA'),
            (0, src_1.If)(() => true),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ComponentB.prototype, "IntentA", null);
        ComponentB = __decorate([
            (0, src_1.Global)(),
            (0, src_1.Component)()
        ], ComponentB);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [ComponentA, ComponentB],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Intent,
                intent: 'IntentA',
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'ComponentB.IntentA',
            },
        ]);
    });
    test('$redirect', async () => {
        var _a;
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Launch]() {
                return this.$redirect(RedirectTargetComponent);
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        let RedirectTargetComponent = class RedirectTargetComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Start]() {
                return this.$send('Hello world');
            }
        };
        RedirectTargetComponent = __decorate([
            (0, src_1.Component)()
        ], RedirectTargetComponent);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent, RedirectTargetComponent],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Launch,
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'Hello world',
            },
        ]);
        expect((_a = server.response.session) === null || _a === void 0 ? void 0 : _a.state).toEqual([
            {
                component: RedirectTargetComponent.name,
            },
        ]);
    });
    test('$delegate', async () => {
        var _a;
        // due to limitations of jest this class can not be defined in a describe block, that's why these components
        // are defined in both tests
        // A separate file could cause issues due to calling metadataManager.clearAll() before every test
        // which would erase the metadata of imported components
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Launch]() {
                return this.$delegate(DelegateTargetComponent, {
                    resolve: {
                        finish: this.onFinishDelegate,
                    },
                });
            }
            onFinishDelegate() {
                return this.$send('Finish');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        let DelegateTargetComponent = class DelegateTargetComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Start]() {
                return this.$send('Hello world');
            }
            async [src_1.BuiltInHandler.Unhandled]() {
                return this.$resolve('finish');
            }
        };
        DelegateTargetComponent = __decorate([
            (0, src_1.Component)()
        ], DelegateTargetComponent);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent, DelegateTargetComponent],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                type: src_1.InputType.Launch,
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([
            {
                message: 'Hello world',
            },
        ]);
        expect((_a = server.response.session) === null || _a === void 0 ? void 0 : _a.state).toEqual([
            {
                component: GlobalComponent.name,
            },
            {
                component: DelegateTargetComponent.name,
                config: undefined,
                resolve: {
                    finish: 'onFinishDelegate',
                },
            },
        ]);
    });
    test('$resolve', async () => {
        var _a;
        let GlobalComponent = class GlobalComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Launch]() {
                return this.$delegate(DelegateTargetComponent, {
                    resolve: {
                        finish: this.onFinishDelegate,
                    },
                });
            }
            onFinishDelegate() {
                return this.$send('Finish');
            }
        };
        GlobalComponent = __decorate([
            (0, src_1.Component)({ global: true })
        ], GlobalComponent);
        let DelegateTargetComponent = class DelegateTargetComponent extends src_1.BaseComponent {
            [src_1.BuiltInHandler.Start]() {
                return this.$send('Hello world');
            }
            TestIntent() {
                return this.$resolve('finish');
            }
            [src_1.BuiltInHandler.Unhandled]() {
                return this.$resolve('finish');
            }
        };
        DelegateTargetComponent = __decorate([
            (0, src_1.Component)()
        ], DelegateTargetComponent);
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform()],
            components: [GlobalComponent, DelegateTargetComponent],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {
                intent: 'TestIntent',
            },
            session: {
                data: {
                    state: [
                        {
                            component: GlobalComponent.name,
                        },
                        {
                            component: DelegateTargetComponent.name,
                            resolve: {
                                finish: 'onFinishDelegate',
                            },
                        },
                    ],
                },
            },
        });
        await app.handle(server);
        expect(server.response.output).toEqual([{ message: 'Finish' }]);
        expect((_a = server.response.session) === null || _a === void 0 ? void 0 : _a.state).toEqual([]);
    });
});
//# sourceMappingURL=e2e.test.js.map