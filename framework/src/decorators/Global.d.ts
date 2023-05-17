import { AnyObject } from '@jovotech/common';
import { ComponentConstructor } from '../BaseComponent';
export declare function Global(isGlobal?: boolean): (target: ComponentConstructor | AnyObject, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => void;
