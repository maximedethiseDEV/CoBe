import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';
import {Select} from 'primeng/select';

@Component({
    selector: 'app-city-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        Select,
        FormsModule
    ],
    templateUrl: './city-create.component.html'
})
export class CityCreateComponent extends BaseCreateComponent {
    @Input() countries: Country[] = [];
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
    public labelHeader: string = 'Nouvelle ville';
    public selectedCountry!: Country;

    public override generateForm(): FormGroup {
        return new FormGroup({
            cityName: new FormControl(),
            postalCode: new FormControl(),
            countryId: new FormControl()
        });
    }

    public create(): void {
        if (this.form.valid && this.selectedCountry) {
            const city: City = this.form.getRawValue();
            city.countryId = this.selectedCountry.id;

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
