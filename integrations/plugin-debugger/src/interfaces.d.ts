import { ArrayElement, Jovo, OmitWhere } from '@jovotech/framework';
import { STATE_MUTATING_METHOD_KEYS } from './constants';
export type PlainObjectType<T> = OmitWhere<T, () => unknown>;
export type StateMutatingJovoMethodKey = ArrayElement<typeof STATE_MUTATING_METHOD_KEYS>;
export interface JovoDebuggerPayload<DATA extends any = any> {
    requestId?: number | string;
    data: DATA;
}
export interface JovoUpdateData<KEY extends keyof Jovo | string = keyof Jovo | string> {
    key: KEY;
    path: KEY extends keyof Jovo ? KEY : string;
    value: KEY extends keyof Jovo ? Jovo[KEY] : any;
    previousValue?: KEY extends keyof Jovo ? Jovo[KEY] | undefined : any;
}
export interface JovoStateMutationData<KEY extends StateMutatingJovoMethodKey = StateMutatingJovoMethodKey> {
    key: KEY;
    to: {
        path?: string;
        handler?: string;
    };
}
