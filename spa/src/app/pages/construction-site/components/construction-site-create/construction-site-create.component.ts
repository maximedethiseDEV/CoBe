import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, SharedDetails, Customer} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SectionCreateMode} from '@core/types';
import {
    AddressFormComponent, ContactFormComponent, HeaderFormComponent,
    SectionFomComponent,
    SharedDetailsFormComponent,
    SubmitButtonComponent
} from '@core/components/form';

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
            address: this.formBuilder.group({
                street: ['', Validators.required],
                cityId: ['', Validators.required],
            }),
            customer: this.formBuilder.group({
                companyName: ['', Validators.required],
                commerciallyActive: [true, Validators.required],
                parentId: [],
                addressId: [],
                sharedDetailsId: [],
            }),
            sharedDetails: this.formBuilder.group({
                label: ['', Validators.required],
                fileName: [],
                notes: [],
            }),
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
                    this.form.get('addressId')?.disable();
                    this.form.get('address')?.enable();
                    break;
                }
                else {
                    this.form.get('address')?.disable();
                    this.form.get('addressId')?.enable();
                    break;
                }
            }
            case 'sharedDetails': {
                if(create) {
                    this.form.get('sharedDetailsId')?.disable();
                    this.form.get('sharedDetails')?.enable();
                    break;
                }
                else {
                    this.form.get('sharedDetails')?.disable();
                    this.form.get('sharedDetailsId')?.enable();
                    break;
                }
            }
            case 'contact': {
                if(create) {
                    this.form.get('contactId')?.disable();
                    this.form.get('contact')?.enable();
                    break;
                }
                else {
                    this.form.get('contact')?.disable();
                    this.form.get('contactId')?.enable();
                    break;
                }
            }
        }
    }
}
