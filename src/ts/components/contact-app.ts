import {Component, View} from 'angular2/angular2';
import {RouteConfig, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {ContactList} from './contacts-list';
import {ContactDetails} from './contact-details';
import {ContactSearch} from './contact-search';
import {ContactForm} from './contact-form';

import {contactStore, ContactStore} from '../services/contacts-store';

@Component({
    selector: 'contact-app'
})
// Not yet working. https://github.com/angular/angular/issues/2242
// TODO: update `contact-app.html` when fixed.
@RouteConfig([
    { path: '/', components: {
        'panel-left': ContactList,
        'panel-right': ContactDetails }
    },
    { path: '/new-contact', components: {
        'panel-left': ContactList,
        'panel-right': ContactForm }
    }
])
@View({
    templateUrl: './templates/contact-app.html',
    directives: [RouterOutlet, ContactList, ContactDetails, ContactSearch]
})
export class ContactApp {
    contacts:Array<any>;
    selectedContact:any;

    constructor() {
        contactStore.getList()
            .then(data => this.contacts = data)
    }
}
