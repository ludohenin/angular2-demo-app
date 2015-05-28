import {Component, View, NgFor, EventEmitter, Parent} from 'angular2/angular2';

import {appDispatcher} from '../services/app-dispatcher';
import {contactStore, ContactStore} from '../services/contacts-store';
import {AppEmitters} from '../services/app-emitters';

@Component({
    selector: 'contact-list',
    properties: {
        'contacts': 'contacts',
        'contact': 'contact'
    }
})
@View({
    templateUrl: './templates/contact-list.html',
    directives: [NgFor]
})
export class ContactList {
    contact:any;
    emitter: EventEmitter;

    constructor() {
        this.emitter = AppEmitters.create('contactSelected');
    }

    select(contact) {
        this.emitter.next(contact);
    }
}
