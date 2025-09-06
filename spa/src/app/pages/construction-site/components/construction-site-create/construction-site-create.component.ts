import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Contact, SharedDetails, Customer} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';
import {SectionCreateMode} from '@core/types';
import {
    AddressFormComponent, ContactFormComponent, HeaderFormComponent,
    SectionFomComponent,
    SharedDetailsFormComponent,
    SubmitButtonComponent
} from '@core/components/form';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { AddressProvider, ContactProvider, SharedDetailsProvider } from '@core/providers';

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
    private addressProvider: AddressProvider = inject(AddressProvider);
    private contactProvider: ContactProvider = inject(ContactProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);

    featurePath: string = 'construction-sites';
    labelHeader: string = 'Nouveau chantier';
    sections = {
        customer: {key:"customer", title: "Client*"},
        address: {key:"address",title: "Adresse de livraison*", addCreateButton: true},
        contact: {key:"contact",title: "Contact", addCreateButton: true},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
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

        form.get('address')?.disable({ emitEvent: false });
        form.get('contact')?.disable({ emitEvent: false });
        form.get('sharedDetails')?.disable({ emitEvent: false });

        return form;
    }

    public create(): void {
        const createAddress = this.form.get('address')?.enabled && this.form.get('address')?.valid;
        const createContact = this.form.get('contact')?.enabled && this.form.get('contact')?.valid;
        const createSharedDetails = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

        const address$ = createAddress ? this.addressProvider.create(this.form.get('address')!.getRawValue()) : of(null);
        const contact$ = createContact ? this.contactProvider.create(this.form.get('contact')!.getRawValue()) : of(null);
        const sharedDetails$ = createSharedDetails ? this.sharedDetailsProvider.create(this.form.get('sharedDetails')!.getRawValue()) : of(null);

        forkJoin([address$, contact$, sharedDetails$]).pipe(
            switchMap(([address, contact, shared]) => {
                const payload: any = {
                    dateStart: this.form.value.dateStart || null,
                    dateEnd: this.form.value.dateEnd || null,
                    customerId: this.form.value.customerId,
                    addressId: address?.id ?? this.form.value.addressId ?? null,
                    contactId: contact?.id ?? this.form.value.contactId ?? null,
                    sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId ?? null,
                };
                return this.constructionSiteProvider.create(payload);
            })
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Chantier enregistré',
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

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath);

            if (!idCtrl || !grp) return;

            if (create) {
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
                grp.updateValueAndValidity({ emitEvent: false });
            } else {
                // On repasse en sélection : activer l'ID (avec required si nécessaire), désactiver le groupe
                grp.disable({ emitEvent: false });
                (grp as FormGroup).reset({}, { emitEvent: false });
                grp.updateValueAndValidity({ emitEvent: false });

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
            case 'address': {
                toggle('addressId', 'address', true);
                break;
            }
            case 'sharedDetails': {
                toggle('sharedDetailsId', 'sharedDetails', true);
                break;
            }
            case 'contact': {
                toggle('contactId', 'contact', true);
                break;
            }
        }
    }

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
