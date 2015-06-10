import {Component, View, EventEmitter} from 'angular2/angular2';

import {contactStore} from '../../services/contacts-store';

@Component({
    selector: 'search',
    events: ['filter']
})
@View({
    templateUrl: './components/contact-app/search.html?v=<%= VERSION %>'
})
export class Search {
    filter = new EventEmitter();

    search(event, value) {
        let result = contactStore.search(value);
        this.filter.next(result);
    }
}
