import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';
import {Select} from 'primeng/select';

@Component({
    selector: 'app-city-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        Select,
        FormsModule
    ],
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent extends BaseUpdateComponent implements OnInit {
    @Input() countries: Country[] = [];
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
    public labelHeader: string = 'Mettre à jour le contact';
    public selectedCountry!: Country|undefined;

    ngOnInit(): void {
        this.selectedCountry = this.countries.find((country: Country) => country.id === this.entity.countryId);
    }

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            cityName: new FormControl(),
            postalCode: new FormControl(),
            countryId: new FormControl()
        });
    }

    public update(): void {
        if (this.form.valid) {
            const city: City = this.form.getRawValue();
            city.countryId = this.selectedCountry?.id || this.entity.countryId;

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
