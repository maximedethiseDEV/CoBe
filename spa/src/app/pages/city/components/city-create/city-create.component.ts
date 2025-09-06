import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {CityFormComponent} from '@core/components/form/city-form/city-form.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-city-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        CityFormComponent,
        HeaderFormComponent
    ],
    templateUrl: './city-create.component.html'
})
export class CityCreateComponent extends BaseCreateComponent {
    countries = input<Country[]>();
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
    public labelHeader: string = 'Nouvelle ville';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
            cityName: ['', Validators.required],
            postalCode: ['', Validators.required],
            countryId: ['', Validators.required],
        });
    }

    public create(): void {
        if (this.form.valid) {
            const city: City = this.form.getRawValue();

            this.cityProvider.create(city).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Contact enregistré',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la création de la ville:', error);
                }
            });
        }
    }
}
