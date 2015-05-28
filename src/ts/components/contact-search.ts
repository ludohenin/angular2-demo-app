import {Component, View, EventEmitter} from 'angular2/angular2';

import {AppEmitters} from '../services/app-emitters';

@Component({
    selector: 'contact-search',
    properties: {
        'contact': 'contact',
        'store': 'store'
    }
})
@View({
    templateUrl: './templates/contact-search.html'
})
export class ContactSearch {
    emitter:EventEmitter;

    constructor() {
        this.emitter = AppEmitters.create('contactSearch');
    }

    search(event, value) {
        this.emitter.next(value);
    }
}
