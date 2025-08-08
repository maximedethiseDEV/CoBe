import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, City, Country} from '@core/models';
import {AddressProvider} from '@core/providers';
import {SelectCityFromAddressPipe} from '@core/pipe/select-city-from-address.pipe';

@Component({
    selector: 'app-address-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SelectCityFromAddressPipe
    ],
    templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent extends BaseUpdateComponent implements OnInit {
    @Input() cities: City[] = [];
    @Input() countries: Country[] = [];
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Mettre à jour la ville';
    public selectedCity!: City | undefined;

    ngOnInit(): void {
        this.selectedCity = this.cities.find((city: City) => city.id === this.entity.cityId);
    }

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            street: new FormControl(),
            cityId: new FormControl()
        });
    }

    getCountryCode(city: City): string {
        const country = this.countries.find(c => c.id === city.countryId);
        return country?.countryCode || 'N/A';
    }

    public update(): void {
        if (this.form.valid) {
            const address: Address = this.form.getRawValue();
            address.cityId = this.selectedCity?.id || this.entity.cityId;

            this.addressProvider.update(address).subscribe({
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
                    console.error("Erreur lors de la mise à jour de l'adresse:", error);
                }
            });
        }
    }
}
