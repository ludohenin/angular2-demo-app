import {Component, View, NgFor, EventEmitter} from 'angular2/angular2';

import {contactStore, ContactStore} from '../services/contacts-store';

@Component({
    selector: 'contact-list',
    properties: {
        'contacts': 'contacts'
    },
    events: ['selected']
})
@View({
    templateUrl: './templates/contact-list.html',
    directives: [NgFor]
})
export class ContactList {
    selected = new EventEmitter();
    contacts:any;

    select(contact) {
        this.selected.next(contact);
    }

    onFilterList(list) {
        this.contacts = list;
    }
}
