import { UnknownObject } from '@jovotech/common';
import { ComponentData, ComponentOptions, JovoComponentInfo } from './index';
import { Jovo } from './Jovo';
import { JovoProxy } from './JovoProxy';
import { ComponentOptionsOf } from './metadata/ComponentMetadata';
export type ComponentConfig<COMPONENT extends BaseComponent = any> = Exclude<COMPONENT['$component']['config'], undefined>;
export type ComponentConstructor<COMPONENT extends BaseComponent = any> = new (jovo: Jovo, options?: ComponentOptionsOf<COMPONENT>) => COMPONENT;
export declare class ComponentDeclaration<COMPONENT extends BaseComponent = any> {
    readonly component: ComponentConstructor<COMPONENT>;
    readonly options?: ComponentOptionsOf<COMPONENT> | undefined;
    constructor(component: ComponentConstructor<COMPONENT>, options?: ComponentOptionsOf<COMPONENT> | undefined);
}
export declare abstract class BaseComponent<DATA extends ComponentData = ComponentData, CONFIG extends UnknownObject = UnknownObject> extends JovoProxy {
    readonly options?: ComponentOptions<CONFIG> | undefined;
    constructor(jovo: Jovo, options?: ComponentOptions<CONFIG> | undefined);
    get $component(): JovoComponentInfo<DATA, CONFIG>;
}
