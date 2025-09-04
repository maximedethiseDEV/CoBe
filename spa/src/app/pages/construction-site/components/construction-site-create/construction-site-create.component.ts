import {Component, inject, input, Input, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, SharedDetails, Customer} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/accordion-fom/section-fom.component';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SectionCreateConfig} from '@core/types';

@Component({
    selector: 'app-construction-site-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        SectionFomComponent,
        SharedDetailsFormComponent,
        AddressFormComponent,
    ],
    templateUrl: './construction-site-create.component.html'
})
export class ConstructionSiteCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    addresses = input<Address[]>();
    contacts = input<Contact[]>();
    sharedDetails = input<SharedDetails[]>();
    formSharedDetails = signal<FormGroup>(new FormGroup({}));
    formAddress = signal<FormGroup>(new FormGroup({}));
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public featurePath: string = 'construction-sites';
    public labelHeader: string = 'Nouveau chantier';
    sections = {
        customer: {key:"customer", title: "Client"},
        address: {key:"address",title: "Adresse de livraison", addCreateButton: true},
        contact: {key:"contact",title: "Contact", addCreateButton: true},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

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
        const formValue : ConstructionSite = this.form.getRawValue();
        this.constructionSiteProvider.create(formValue).subscribe({
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

    onSectionCreateModeChange($event: SectionCreateConfig) {
        // TODO A implémenter
    }
}
