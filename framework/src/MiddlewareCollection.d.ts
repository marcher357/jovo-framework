import { AnyObject, ArrayElement } from '@jovotech/common';
import { Jovo } from './index';
import { Middleware, MiddlewareFunction } from './Middleware';
export type PossibleMiddlewareNames<MIDDLEWARES extends string[]> = PossibleMiddlewareName<ArrayElement<MIDDLEWARES>>;
export type PossibleMiddlewareName<NAME extends string> = NAME | `after.${NAME}` | `before.${NAME}`;
export declare class MiddlewareCollection<MIDDLEWARES extends string[] = string[]> {
    readonly middlewares: Record<string, Middleware>;
    constructor(...names: MIDDLEWARES);
    get names(): Array<PossibleMiddlewareNames<MIDDLEWARES> | string>;
    use(name: PossibleMiddlewareNames<MIDDLEWARES>, ...fns: MiddlewareFunction[]): this;
    use(name: string, ...fns: MiddlewareFunction[]): this;
    add(...names: string[]): this;
    add(...middlewares: Middleware[]): this;
    has(name: PossibleMiddlewareNames<MIDDLEWARES>): boolean;
    has(name: string): boolean;
    get<MIDDLEWARE extends PossibleMiddlewareNames<MIDDLEWARES>>(name: MIDDLEWARE): Middleware<MIDDLEWARE> | undefined;
    get<MIDDLEWARE extends string>(name: MIDDLEWARE): Middleware<MIDDLEWARE> | undefined;
    remove(...names: PossibleMiddlewareNames<MIDDLEWARES>[]): this;
    remove(...names: string[]): this;
    clear(): this;
    run(name: PossibleMiddlewareNames<MIDDLEWARES>, jovo: Jovo, payload?: AnyObject): Promise<void>;
    run(name: string, jovo: Jovo, payload?: AnyObject): Promise<void>;
    run(names: PossibleMiddlewareNames<MIDDLEWARES>[], jovo: Jovo, payload?: AnyObject): Promise<void>;
    run(names: string[], jovo: Jovo, payload?: AnyObject): Promise<void>;
    disable(...names: PossibleMiddlewareNames<MIDDLEWARES>[]): this;
    disable(...names: string[]): this;
    enable(...names: PossibleMiddlewareNames<MIDDLEWARES>[]): this;
    enable(...names: string[]): this;
}
