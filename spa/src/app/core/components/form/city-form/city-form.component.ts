import {Component, inject, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Country} from '@core/models';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-city-form',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './city-form.component.html'
})
export class CityFormComponent {
    private route = inject(ActivatedRoute);
    countries = input<Country[]>(this.route.snapshot.data['countries'] as Country[]);
    form = input.required<FormGroup>();
}
