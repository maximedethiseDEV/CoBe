import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {AddressProvider} from '@core/providers';
import {Address, City} from '@core/models';

@Component({
    selector: 'app-address-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './address-create.component.html'
})
export class AddressCreateComponent extends BaseCreateComponent {
    @Input() cities: City[] = [];
    private addressProvider: AddressProvider = inject(AddressProvider);
    public featurePath: string = 'addresses';
    public labelHeader: string = 'Nouvelle adresse';

    public override generateForm(): FormGroup {
        return new FormGroup({
            street: new FormControl("",Validators.required),
            cityId: new FormControl("",Validators.required)
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
