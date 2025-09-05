import {Component, inject, input, signal} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, SharedDetails, Customer, City} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SectionCreateMode} from '@core/types';
import {ContactFormComponent} from '@core/components/form/contact-form/contact-form.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

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
        ContactFormComponent,
        HeaderFormComponent,
    ],
    templateUrl: './construction-site-create.component.html'
})
export class ConstructionSiteCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    addresses = input<Address[]>();
    contacts = input<Contact[]>();
    sharedDetails = input<SharedDetails[]>();
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    featurePath: string = 'construction-sites';
    labelHeader: string = 'Nouveau chantier';
    sections = {
        customer: {key:"customer", title: "Client"},
        address: {key:"address",title: "Adresse de livraison", addCreateButton: true},
        contact: {key:"contact",title: "Contact", addCreateButton: true},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        return this.formBuilder.group({
            dateStart: [],
            dateEnd: [],
            customerId: ['', Validators.required],
            addressId: ['', Validators.required],
            contactId: [],
            sharedDetailsId: [],
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

    onSectionCreateModeChange($event: SectionCreateMode) {
        const { key, create } = $event;

        switch (key) {
            case 'address': {
                if(create) {
                    this.form.removeControl('addressId');
                    break;
                }
                else {
                    this.form.removeControl('address');
                    this.form.addControl('addressId', this.formBuilder.control(null, [Validators.required]));
                    break;
                }
            }
            case 'sharedDetails': {
                if(create) {
                    this.form.removeControl('sharedDetailsId');
                    break;
                }
                else {
                    this.form.removeControl('sharedDetails');
                    this.form.addControl('sharedDetailsId', this.formBuilder.control(null));
                    break;
                }
            }
            case 'contact': {
                if(create) {
                    this.form.removeControl('contactId');
                    break;
                }
                else {
                    this.form.removeControl('contact');
                    this.form.addControl('contactId', this.formBuilder.control(null));
                    break;
                }
            }
        }
    }
}
