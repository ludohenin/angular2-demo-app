import {Component, View, EventEmitter} from 'angular2/angular2';

import {contactStore} from '../services/contacts-store';

@Component({
    selector: 'contact-search',
    events: ['filter']
})
@View({
    templateUrl: './templates/contact-search.html'
})
export class ContactSearch {
    filter = new EventEmitter();

    search(event, value) {
        let result = contactStore.search(value);
        this.filter.next(result);
    }
}
