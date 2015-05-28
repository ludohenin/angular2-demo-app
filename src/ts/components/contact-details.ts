import {Component, View, NgIf} from 'angular2/angular2';

@Component({
    selector: 'contact-details',
    properties: {
        'contact': 'contact',
        'store': 'store'
    }
})
@View({
    templateUrl: './templates/contact-details.html',
    directives: [NgIf]
})
export class ContactDetails {}
