import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, Customer, SharedDetails} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent, AddressFormComponent, ContactFormComponent, SharedDetailsFormComponent} from '@core/components/form';
import {SectionCreateMode} from '@core/types';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AddressProvider, ContactProvider, SharedDetailsProvider} from '@core/providers';

@Component({
    selector: 'app-construction-site-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
        AddressFormComponent,
        ContactFormComponent,
        SharedDetailsFormComponent
    ],
    templateUrl: './construction-site-update.component.html'
})
export class ConstructionSiteUpdateComponent extends BaseUpdateComponent {
    customers = input<Customer[]>();
    addresses = input<Address[]>();
    contacts = input<Contact[]>();
    sharedDetails = input<SharedDetails[]>();
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    private addressProvider: AddressProvider = inject(AddressProvider);
    private contactProvider: ContactProvider = inject(ContactProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);

    public featurePath: string = 'construction-sites';
    public labelHeader: string = 'Mettre à jour le chantier';

    sections = {
        customer: {key:"customer", title: "Client*"},
        address: {key:"address",title: "Adresse de livraison*", addCreateButton: true},
        contact: {key:"contact",title: "Contact", addCreateButton: true},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            id: [],
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
            sharedDetails: this.formBuilder.group({
                label: ['', Validators.required],
                fileName: [],
                notes: [],
            }),
            contact: this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: [],
                email: [],
                phone: [],
                role: [],
            }),
        });

        // Sous-groupes désactivés par défaut (mode sélection)
        form.get('address')?.disable({ emitEvent: false });
        form.get('contact')?.disable({ emitEvent: false });
        form.get('sharedDetails')?.disable({ emitEvent: false });

        return form;
    }

    public update(): void {
        const createAddress = this.form.get('address')?.enabled && this.form.get('address')?.valid;
        const createContact = this.form.get('contact')?.enabled && this.form.get('contact')?.valid;
        const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

        const address$ = createAddress ? this.addressProvider.create(this.form.get('address')!.getRawValue()) : of(null);
        const contact$ = createContact ? this.contactProvider.create(this.form.get('contact')!.getRawValue()) : of(null);
        const shared$  = createShared  ? this.sharedDetailsProvider.create(this.form.get('sharedDetails')!.getRawValue()) : of(null);

        forkJoin([address$, contact$, shared$]).pipe(
            switchMap(([address, contact, shared]) => {
                const payload: Partial<ConstructionSite> = {
                    id: this.form.value.id,
                    dateStart: this.form.value.dateStart || null,
                    dateEnd: this.form.value.dateEnd || null,
                    customerId: this.form.value.customerId,
                    addressId: address?.id ?? this.form.value.addressId,
                    contactId: contact?.id ?? this.form.value.contactId,
                    sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId,
                };
                console.log("Payload:", payload);
                return this.constructionSiteProvider.update(payload);
            })
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Chantier mis à jour',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la mise à jour du chantier:", error);
            }
        });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {
        const { key, create } = $event;

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath);

            if (!idCtrl || !grp) return;

            if (create) {
                // Sélection -> Création
                idCtrl.clearValidators();
                idCtrl.setValue(null);
                idCtrl.disable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });

                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values((grp as FormGroup).controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
                (grp as FormGroup).updateValueAndValidity({ emitEvent: false });
            } else {
                // Création -> Sélection
                (grp as FormGroup).disable({ emitEvent: false });
                (grp as FormGroup).reset({}, { emitEvent: false });
                (grp as FormGroup).updateValueAndValidity({ emitEvent: false });

                if (idCtrlPath === 'addressId' || idCtrlPath === 'customerId') {
                    idCtrl.setValidators([Validators.required]);
                } else {
                    idCtrl.clearValidators();
                }
                idCtrl.enable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });
            }

            this.form.updateValueAndValidity();
        };

        switch (key) {
            case 'address': toggle('addressId', 'address', true); break;
            case 'sharedDetails': toggle('sharedDetailsId', 'sharedDetails', true); break;
            case 'contact': toggle('contactId', 'contact', true); break;
        }
    }

    // Getters pour les sous-groupes
    get addressGroup(): FormGroup {
        return this.form.get('address') as FormGroup;
    }
    get contactGroup(): FormGroup {
        return this.form.get('contact') as FormGroup;
    }
    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }
}
