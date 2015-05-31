import {Component, View} from 'angular2/angular2';
import {formDirectives, FormBuilder, FormGroup, Validators} from 'angular2/forms';

@Component({
    selector: 'contact-form',
    appInjector: [FormBuilder]
})
@View({
    templateUrl: './templates/contact-form.html',
    directives: [formDirectives]
})
export class ContactForm {
    contactForm:FormGroup;
    builder:FormBuilder;

    constructor(builder:FormBuilder) {
        // this.builder = FormBuilder;
        this.contactForm = builder.group({
            name: ["", Validators.required]
        });

        console.log(this.contactForm);
    }
}
