import {Component, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './country-form.component.html'
})
export class CountryFormComponent {
  form = input.required<FormGroup>();
}
