import {Component, View, NgFor, EventEmitter} from 'angular2/angular2';

@Component({
    selector: 'contact-list',
    properties: ['contacts'],
    events: ['selected']
})
@View({
    templateUrl: './components/contact-app/contact-list.html?v=<%= VERSION %>',
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
