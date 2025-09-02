import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, City, Company, Contact, Country, Customer, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider, CustomerProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-customer-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent extends BaseUpdateComponent {
    @Input() companies: Company[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private customerProvider: CustomerProvider = inject(CustomerProvider);
    public featurePath: string = 'customers';
    public labelHeader: string = 'Mettre à jour le client';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl(),
            parentId: new FormControl(),
            dateStart: new FormControl(),
            dateEnd: new FormControl()
        });
    }

    public update(): void {
        const customer : Customer = this.form.getRawValue();
        this.customerProvider.update(customer).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Client enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du client:", error);
            }
        });
    }
}
