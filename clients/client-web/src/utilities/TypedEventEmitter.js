"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedEventEmitter = void 0;
const events_1 = require("events");
class TypedEventEmitter {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    static listenerCount(emitter, type) {
        return events_1.EventEmitter.listenerCount(emitter.eventEmitter, type);
    }
    static get defaultMaxListeners() {
        return events_1.EventEmitter.defaultMaxListeners;
    }
    static set defaultMaxListeners(value) {
        events_1.EventEmitter.defaultMaxListeners = value;
    }
    eventNames() {
        return this.eventEmitter.eventNames();
    }
    setMaxListeners(amount) {
        this.eventEmitter.setMaxListeners(amount);
        return this;
    }
    getMaxListeners() {
        return this.eventEmitter.getMaxListeners();
    }
    emit(type, ...args) {
        return this.eventEmitter.emit(type, ...args);
    }
    addListener(type, listener) {
        this.eventEmitter.addListener(type, listener);
        return this;
    }
    on(type, listener) {
        this.eventEmitter.on(type, listener);
        return this;
    }
    once(type, listener) {
        this.eventEmitter.once(type, listener);
        return this;
    }
    prependListener(type, listener) {
        this.eventEmitter.prependListener(type, listener);
        return this;
    }
    prependOnceListener(type, listener) {
        this.eventEmitter.prependOnceListener(type, listener);
        return this;
    }
    removeListener(type, listener) {
        this.eventEmitter.removeListener(type, listener);
        return this;
    }
    off(type, listener) {
        this.eventEmitter.off(type, listener);
        return this;
    }
    removeAllListeners(type) {
        this.eventEmitter.removeAllListeners(type);
        return this;
    }
    listeners(type) {
        return this.eventEmitter.listeners(type);
    }
    listenerCount(type) {
        return this.eventEmitter.listenerCount(type);
    }
    rawListeners(type) {
        return this.eventEmitter.rawListeners(type);
    }
}
exports.TypedEventEmitter = TypedEventEmitter;
//# sourceMappingURL=TypedEventEmitter.js.map