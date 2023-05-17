import { AnyObject, DeepPartial, UnknownObject } from '@jovotech/common';
import { BaseComponent, ComponentConfig, ComponentConstructor, ComponentDeclaration } from '../BaseComponent';
import { JovoConditionFunction } from '../index';
import { ClassDecoratorMetadata } from './ClassDecoratorMetadata';
import { ComponentOptionMetadata } from './ComponentOptionMetadata';
export interface ComponentOptions<CONFIG extends UnknownObject | undefined> extends UnknownObject {
    name?: string;
    global?: boolean;
    config?: DeepPartial<CONFIG>;
    components?: Array<ComponentConstructor | ComponentDeclaration>;
    models?: AnyObject;
    isAvailable?: JovoConditionFunction;
    platforms?: string[];
}
export type ComponentOptionsOf<COMPONENT extends BaseComponent> = ComponentOptions<ComponentConfig<COMPONENT>>;
export declare class ComponentMetadata<COMPONENT extends BaseComponent = BaseComponent> extends ClassDecoratorMetadata<COMPONENT> {
    readonly target: ComponentConstructor<COMPONENT> | Function;
    readonly options: ComponentOptionsOf<COMPONENT>;
    constructor(target: ComponentConstructor<COMPONENT> | Function, options?: ComponentOptionsOf<COMPONENT>);
    get isGlobal(): boolean;
    mergeWith(otherMetadata: ComponentMetadata<COMPONENT> | ComponentOptionMetadata<COMPONENT>): ComponentMetadata<COMPONENT>;
}
