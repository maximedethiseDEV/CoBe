import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Company, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider, SharedDetailsProvider} from '@core/providers';
import {forkJoin, of} from 'rxjs';
import {
    AddressFormComponent,
    HeaderFormComponent,
    SectionFomComponent,
    SharedDetailsFormComponent,
    SubmitButtonComponent
} from '@core/components/form';
import {SectionCreateMode} from '@core/types';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-company-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        AddressFormComponent,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
        SectionFomComponent,
        HeaderFormComponent,
    ],
    templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent extends BaseCreateComponent {
    addresses = input<Address[]>();
    sharedDetails = input<SharedDetails[]>();
    companies = input<Company[]>();
    private companyProvider: CompanyProvider = inject(CompanyProvider);
    private addressProvider: AddressProvider = inject(AddressProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    featurePath: string = 'companies';
    labelHeader: string = 'Nouvelle entreprise';
    sections = {
        parent: {key: "parent", title: "Donneur d'ordre"},
        company: {key: "company", title: "Entreprise"},
        address: {key: "address", title: "Adresse", addCreateButton: true},
        sharedDetails: {key: "sharedDetails", title: "Détails", addCreateButton: true}
    };

    public generateForm(): FormGroup {
        const form = this.formBuilder.group({
            companyName: ['', Validators.required],
            commerciallyActive: [true, Validators.required],
            codeAS400: ['',[Validators.required, Validators.maxLength(4)]],
            codeSAP: ['',Validators.required, Validators.maxLength(10)],
            parentId: [],
            addressId: [],
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
        });

        // Désactiver les sous-formulaires (mode sélection par défaut)
        form.get('address')?.disable({ emitEvent: false });
        form.get('sharedDetails')?.disable({ emitEvent: false });

        return form;
    }

    public create(): void {
        if (this.form.pending) {
            this.form.updateValueAndValidity();
        }
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const addressGroup = this.form.get('address') as FormGroup;
        const sharedGroup = this.form.get('sharedDetails') as FormGroup;

        const createAddress = addressGroup?.enabled && addressGroup.valid;
        const createShared = sharedGroup?.enabled && sharedGroup.valid;

        const address$ = createAddress ? this.addressProvider.create(addressGroup.getRawValue()) : of(null);

        const sharedDetails$ = createShared ? this.sharedDetailsProvider.create(sharedGroup.getRawValue()) : of(null);

        forkJoin([address$, sharedDetails$])
            .pipe(
                switchMap(([address, shared]) => {
                    const payload: Partial<Company> = {
                        companyName: this.form.value.companyName!,
                        commerciallyActive: this.form.value.commerciallyActive!,
                        codeAS400: this.form.value.codeAS400,
                        codeSAP: this.form.value.codeSAP,
                        parentId: this.form.value.parentId ?? null,
                        addressId: address?.id ?? this.form.value.addressId ?? null,
                        sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId ?? null
                    };
                    return this.companyProvider.create(payload as Company);
                })
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Entreprise enregistrée',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la création de l'entreprise:", error);
                }
            });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {
        const {key, create} = $event;

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath) as FormGroup;

            if (!idCtrl || !grp) return;

            if (create) {
                // Passage en mode création
                idCtrl.setValue(null, { emitEvent: false });
                idCtrl.clearValidators();
                idCtrl.disable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });

                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
            } else {
                // Retour en mode sélection
                grp.disable({ emitEvent: false });
                grp.reset({}, { emitEvent: false });
                grp.updateValueAndValidity({ emitEvent: false });

                // Pour Company, addressId/sharedDetailsId ne sont pas requis : pas de re-validators
                idCtrl.clearValidators();
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
        }
    }
    get addressGroup(): FormGroup {
        return this.form.get('address') as FormGroup;
    }
    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }
}
