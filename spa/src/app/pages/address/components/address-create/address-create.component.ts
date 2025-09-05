import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {AddressProvider} from '@core/providers';
import {Address} from '@core/models';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-address-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        AddressFormComponent,
        SubmitButtonComponent,
        HeaderFormComponent,
    ],
    templateUrl: './address-create.component.html'
})
export class AddressCreateComponent extends BaseCreateComponent {
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Nouvelle adresse';


    public generateForm(): FormGroup {
        return this.formBuilder.group({
            street: ['', Validators.required],
            cityId: ['', Validators.required],
        });
    }

    public create(): void {
        if (this.form.valid ) {
            const address : Address = this.form.getRawValue();

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
