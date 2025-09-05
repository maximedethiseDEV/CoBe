import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address} from '@core/models';
import {AddressProvider} from '@core/providers';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-address-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        AddressFormComponent,
        SubmitButtonComponent,
        HeaderFormComponent,
    ],
    templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent extends BaseUpdateComponent {
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Mettre à jour l\'adresse';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
                id: [],
                street: ['', Validators.required],
                cityId: ['', Validators.required],
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
