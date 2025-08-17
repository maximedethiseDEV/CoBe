import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, City} from '@core/models';
import {AddressProvider} from '@core/providers';

@Component({
    selector: 'app-address-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent extends BaseUpdateComponent {
    @Input() cities: City[] = [];
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Mettre à jour la ville';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            street: new FormControl(),
            cityId: new FormControl("",Validators.required)
        });
    }

    public update(): void {
        if (this.form.valid) {
            const address: Address = this.form.getRawValue();

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
