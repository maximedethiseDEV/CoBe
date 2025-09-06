import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {CityFormComponent} from '@core/components/form/city-form/city-form.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-city-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        CityFormComponent,
        HeaderFormComponent
    ],
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent extends BaseUpdateComponent {
    @Input() countries: Country[] = [];
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
    public labelHeader: string = 'Mettre à jour la ville';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
            id: ['',Validators.required],
            cityName: ['', Validators.required],
            postalCode: ['', Validators.required],
            countryId: ['', Validators.required],
        });
    }
    public update(): void {
        if (this.form.valid) {
            const city: City = this.form.getRawValue();

            this.cityProvider.update(city).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Mis à jour',
                        detail: 'Contact mis à jour',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la mise à jour du contact:', error);
                }
            });
        }
    }
}
