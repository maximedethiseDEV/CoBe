import {Component, inject, model, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
    cities = signal<City[]>(this.route.snapshot.data['cities'] as City[]);
    formAddress = model.required<FormGroup>();
    form = new FormGroup({
        street: new FormControl('', [Validators.required]),
        cityId: new FormControl('', [Validators.required]),
    })

    ngOnInit() {
        this.formAddress.set(this.form);
    }
}
