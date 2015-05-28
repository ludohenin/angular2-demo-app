import {EventEmitter} from 'angular2/angular2';

let registry = {};

function get(name: string):EventEmitter {
    if (!registry[name]) registry[name] = new EventEmitter();
    return registry[name];
}

export class AppEmitters {
    static create(name) {
        return get(name);
    }

    static subscribe(name, onNext, onThrow = null, onReturn = null) {
        var emitter = get(name);
        return emitter.observer({next: onNext, throw: onThrow, return: onReturn})
    }
}
