import {Component, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
    form = input.required<FormGroup>();
}
