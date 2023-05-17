import { PickWhere } from '@jovotech/common';
import { BaseComponent, ComponentConstructor, ComponentDeclaration } from './BaseComponent';
import { ComponentTree, Tree } from './ComponentTree';
import { Jovo } from './Jovo';
import { ComponentMetadata } from './metadata/ComponentMetadata';
export interface ComponentTreeNodeOptions<COMPONENT extends BaseComponent = BaseComponent> {
    metadata: ComponentMetadata<COMPONENT>;
    path: string[];
    parent?: ComponentTreeNode;
    children?: Array<ComponentConstructor | ComponentDeclaration>;
}
export interface ExecuteHandlerOptions<COMPONENT extends BaseComponent, HANDLER extends Exclude<keyof PickWhere<COMPONENT, Function>, keyof BaseComponent>, ARGS extends unknown[] = any[]> {
    jovo: Jovo;
    handler?: HANDLER | string;
    callArgs?: ARGS;
}
export declare class ComponentTreeNode<COMPONENT extends BaseComponent = BaseComponent> {
    readonly metadata: ComponentMetadata<COMPONENT>;
    readonly parent?: ComponentTreeNode;
    readonly children?: Tree<ComponentTreeNode>;
    readonly path: string[];
    constructor(componentTree: ComponentTree, { path, metadata, parent, children }: ComponentTreeNodeOptions<COMPONENT>);
    get isRootNode(): boolean;
    get name(): string;
    executeHandler<HANDLER extends Exclude<keyof PickWhere<COMPONENT, Function>, keyof BaseComponent>, ARGS extends unknown[] = any[]>({ jovo, handler, callArgs, }: ExecuteHandlerOptions<COMPONENT, HANDLER, ARGS>): Promise<void>;
    toJSON(): Omit<ComponentTreeNode<COMPONENT>, 'parent'> & {
        parent?: string;
    };
}
