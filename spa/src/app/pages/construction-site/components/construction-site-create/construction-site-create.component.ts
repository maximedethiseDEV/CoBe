import {Component, inject, input, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, SharedDetails, Customer} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-construction-site-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './construction-site-create.component.html'
})
export class ConstructionSiteCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    addresses = input<Address[]>();
    contacts = input<Contact[]>();
    sharedDetails = input<SharedDetails[]>();
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public featurePath: string = 'construction-sites';
    public labelHeader: string = 'Nouveau chantier';

    public override generateForm(): FormGroup {
        return new FormGroup({
            dateStart: new FormControl(),
            dateEnd: new FormControl(),
            customerId: new FormControl("",Validators.required),
            addressId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl(),
        });
    }

    public create(): void {
        const constructionSite : ConstructionSite = this.form.getRawValue();
        console.log(constructionSite);
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
