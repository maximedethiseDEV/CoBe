import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, MaterialSupplier, Contact, SharedDetails, Company} from '@core/models';
import {MaterialSupplierProvider} from '@core/providers';

@Component({
    selector: 'app-materialSupplier-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './material-supplier-create.component.html'
})
export class MaterialSupplierCreateComponent extends BaseCreateComponent {
    @Input() companies: Company[] = [];
    @Input() addresses: Address[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    public featurePath: string = 'material-suppliers';
    public labelHeader: string = 'Nouveau fournisseur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            addressId: new FormControl(),
            sharedDetailsId: new FormControl(),
        });
    }

    public create(): void {
        const materialSupplier : MaterialSupplier = this.form.getRawValue();
        this.materialSupplierProvider.create(materialSupplier).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Fournisseur enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du fournisseur:", error);
            }
        });
    }
}
