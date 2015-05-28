import {Component, View, bootstrap} from 'angular2/angular2';
import {Router, RouteConfig, RouteParams, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {ContactList} from './contacts-list';
import {ContactDetails} from './contact-details';
import {ContactSearch} from './contact-search';
import {contactStore, ContactStore} from '../services/contacts-store';
import {AppEmitters} from '../services/app-emitters';

@Component({
    selector: 'contact-app',
})
@View({
    templateUrl: './templates/contact-app.html',
    directives: [ContactList, ContactDetails, ContactSearch, RouterOutlet]
})
export class ContactApp {
    store:ContactStore;
    contacts:Array<any>;
    selectedContact:any;

    constructor() {
        this.store = contactStore;
        this.store.getList()
            .then(data => this.contacts = data);

        AppEmitters.subscribe('contactSelected'
            , value => this.selectedContact = value);

        AppEmitters.subscribe('contactSearch'
            , value => this.contacts = this.store.search(value));
    }
}
