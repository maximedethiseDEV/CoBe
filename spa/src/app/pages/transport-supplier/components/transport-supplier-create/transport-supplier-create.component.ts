import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, TransportSupplier, Contact, SharedDetails, Company} from '@core/models';
import {TransportSupplierProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-transport-supplier-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './transport-supplier-create.component.html'
})
export class TransportSupplierCreateComponent extends BaseCreateComponent {
    @Input() companies: Company[] = [];
    @Input() contacts: Contact[] = [];
    private transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    public featurePath: string = 'transport-suppliers';
    public labelHeader: string = 'Nouveau Transporteur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            license: new FormControl()
        });
    }

    public create(): void {
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
