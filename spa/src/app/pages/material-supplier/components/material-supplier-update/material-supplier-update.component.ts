import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, Company, Contact, MaterialSupplier, SharedDetails} from '@core/models';
import {MaterialSupplierProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-material-supplier-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './material-supplier-update.component.html'
})
export class MaterialSupplierUpdateComponent extends BaseUpdateComponent {
    @Input() companies: Company[] = [];
    @Input() addresses: Address[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    public featurePath: string = 'material-suppliers';
    public labelHeader: string = 'Nouveau fournisseur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            addressId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl(),
        });
    }

    public update(): void {
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
