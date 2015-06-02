import {Component, View, EventEmitter, NgIf} from 'angular2/angular2';

@Component({
    selector: 'contact-details'
})
@View({
    templateUrl: './components/contact-app/contact-details.html',
    directives: [NgIf]
})
export class ContactDetails {
    contact:any;

    onSelectContact(contact) {
        this.contact = contact;
    }
}
