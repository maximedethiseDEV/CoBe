import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {AddressProvider} from '@core/providers';
import {Address} from '@core/models';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {LucideIconsList} from '@core/lists';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-address-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        AddressFormComponent,
        SubmitButtonComponent,
    ],
    templateUrl: './address-create.component.html'
})
export class AddressCreateComponent extends BaseCreateComponent {
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Nouvelle adresse';


    public override generateForm(): FormGroup {
        return new FormGroup({});
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
