import { AnyListener, ErrorListener } from '../interfaces';
export interface EventListenerMap {
    [key: string]: AnyListener;
    error: ErrorListener;
}
export declare class TypedEventEmitter<EVENT_LISTENER_MAP extends EventListenerMap> {
    static listenerCount<EVENT_LISTENER_MAP extends EventListenerMap, EVENT extends keyof EVENT_LISTENER_MAP>(emitter: TypedEventEmitter<EVENT_LISTENER_MAP>, type: EVENT): number;
    static get defaultMaxListeners(): number;
    static set defaultMaxListeners(value: number);
    private eventEmitter;
    eventNames(): Array<keyof EVENT_LISTENER_MAP>;
    setMaxListeners(amount: number): this;
    getMaxListeners(): number;
    emit<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, ...args: Parameters<EVENT_LISTENER_MAP[EVENT]>): boolean;
    addListener<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    on<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    once<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    prependListener<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    prependOnceListener<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    removeListener<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    off<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT, listener: EVENT_LISTENER_MAP[EVENT]): this;
    removeAllListeners<EVENT extends keyof EVENT_LISTENER_MAP>(type?: EVENT): this;
    listeners<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT): EVENT_LISTENER_MAP[EVENT][];
    listenerCount<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT): number;
    rawListeners<EVENT extends keyof EVENT_LISTENER_MAP>(type: EVENT): EVENT_LISTENER_MAP[EVENT][];
}
