import { Jovo } from './Jovo';
import { AnyObject } from '@jovotech/common';
export type MiddlewareFunction = (jovo: Jovo, payload?: AnyObject) => Promise<unknown> | unknown;
export declare class Middleware<NAME extends string = string> {
    readonly name: NAME;
    readonly fns: MiddlewareFunction[];
    enabled: boolean;
    constructor(name: NAME);
    use(...fns: MiddlewareFunction[]): this;
    run(jovo: Jovo, payload?: AnyObject): Promise<void>;
    remove(fn: MiddlewareFunction): this;
}
