import {Component, inject, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {City} from '@core/models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-address-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './address-form.component.html'
})
export class AddressFormComponent {

    private route = inject(ActivatedRoute);
    cities = input<City[]>(this.route.snapshot.data['cities'] as City[]);
    form = input.required<FormGroup>();
}
