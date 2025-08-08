import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, City, Country} from '@core/models';
import {AddressProvider} from '@core/providers';
import {SelectCityFromAddressPipe} from '@core/pipe/select-city-from-address.pipe';

@Component({
    selector: 'app-address-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SelectCityFromAddressPipe
    ],
    templateUrl: './address-create.component.html'
})
export class AddressCreateComponent extends BaseCreateComponent {
    @Input() cities: City[] = [];
    @Input() countries: Country[] = [];
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Nouvelle addresse';
    public selectedCity!: City;

    public override generateForm(): FormGroup {
        return new FormGroup({
            street: new FormControl(Validators.required)
        });
    }

    public create(): void {
        if (this.form.valid && this.selectedCity) {
            const address: Address = this.form.getRawValue();
            address.cityId = this.selectedCity.id;

            this.addressProvider.create(address).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Adresse enregistrée',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la création de l'adresse:", error);
                }
            });
        }
    }
}
