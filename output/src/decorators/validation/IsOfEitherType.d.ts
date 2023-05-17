import { ValidationOptions } from '../..';
export type PossibleType = 'array' | 'undefined' | 'object' | 'boolean' | 'number' | 'string' | 'symbol' | 'function';
export declare function IsOfEitherType(types: PossibleType[], options?: ValidationOptions): PropertyDecorator;
