import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, Company, Contact, MaterialSupplier, SharedDetails, TransportSupplier} from '@core/models';
import {MaterialSupplierProvider, TransportSupplierProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-transport-supplier-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './transport-supplier-update.component.html'
})
export class TransportSupplierUpdateComponent extends BaseUpdateComponent {
    @Input() companies: Company[] = [];
    @Input() contacts: Contact[] = [];
    private transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    public featurePath: string = 'transport-suppliers';
    public labelHeader: string = 'Mettre à jour le transporteur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            license: new FormControl()
        });
    }

    public update(): void {
        const transportSupplier : TransportSupplier = this.form.getRawValue();
        this.transportSupplierProvider.create(transportSupplier).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Transporteur enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du transporteur:", error);
            }
        });
    }
}
