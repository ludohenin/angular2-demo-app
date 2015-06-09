import {Component, View, EventEmitter} from 'angular2/angular2';

import {contactStore} from '../../services/contacts-store';

@Component({
    selector: 'contact-search',
    events: ['filter']
})
@View({
    templateUrl: './components/contact-app/contact-search.html?v=<%= VERSION %>'
})
export class ContactSearch {
    filter = new EventEmitter();

    search(event, value) {
        let result = contactStore.search(value);
        this.filter.next(result);
    }
}
