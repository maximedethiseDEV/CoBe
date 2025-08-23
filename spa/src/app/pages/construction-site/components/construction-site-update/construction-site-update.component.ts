import {Component, inject, input, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, Company, ConstructionSite, Contact, Customer, MaterialSupplier, SharedDetails} from '@core/models';
import {ConstructionSiteProvider, MaterialSupplierProvider} from '@core/providers';

@Component({
    selector: 'app-construction-site-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './construction-site-update.component.html'
})
export class ConstructionSiteUpdateComponent extends BaseUpdateComponent {
    customers = input<Customer[]>();
    addresses = input<Address[]>();
    contacts = input<Contact[]>();
    sharedDetails = input<SharedDetails[]>();
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public featurePath: string = 'construction-sites';
    public labelHeader: string = 'Mettre à jour le chantier';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            dateStart: new FormControl(),
            dateEnd: new FormControl(),
            customerId: new FormControl("",Validators.required),
            addressId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl(),
        });
    }

    public update(): void {
        const constructionSite : ConstructionSite = this.form.getRawValue();
        this.constructionSiteProvider.create(constructionSite).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Chantier enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du chantier:", error);
            }
        });
    }
}
