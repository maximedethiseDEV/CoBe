import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Customer, Contact, SharedDetails, Company} from '@core/models';
import {CustomerProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-customer-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './customer-create.component.html'
})
export class CustomerCreateComponent extends BaseCreateComponent {
    @Input() companies: Company[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private customerProvider: CustomerProvider = inject(CustomerProvider);
    public featurePath: string = 'customers';
    public labelHeader: string = 'Nouveau client';

    public override generateForm(): FormGroup {
        return new FormGroup({
            companyId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl(),
            parentId: new FormControl()
        });
    }

    public create(): void {
            const customer : Customer = this.form.getRawValue();
            this.customerProvider.create(customer).subscribe({
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
