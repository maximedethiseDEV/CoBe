import {Component, inject, input, signal} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Company, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider, SharedDetailsProvider} from '@core/providers';
import {concatMap, of, forkJoin, map} from 'rxjs';
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
            parentId: [],
            addressId: [], // pas required: l'adresse est optionnelle côté back
            sharedDetailsId: [], // optionnel aussi
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

        // Désactiver par défaut les sous-formulaires de création
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

        // Déterminer si on crée les sous-entités
        const addressGroup = this.form.get('address') as FormGroup;
        const sharedGroup = this.form.get('sharedDetails') as FormGroup;

        const createAddress = addressGroup?.enabled && addressGroup.valid;
        const createShared = sharedGroup?.enabled && sharedGroup.valid;

        // Construire FormData pour sharedDetails si fichier présent
        let sharedFormData: FormData | null = null;
        if (createShared) {
            const s = sharedGroup.getRawValue();
            sharedFormData = new FormData();
            if (s.fileName) sharedFormData.append('file', s.fileName);
            if (s.notes) sharedFormData.append('notes', s.notes);
            if (s.label) sharedFormData.append('label', s.label);
        }

        const addressId$ = createAddress
            ? this.addressProvider.create(addressGroup.getRawValue()).pipe(map((r: any) => r?.id ?? null))
            : of(this.form.value.addressId ?? null);

        const sharedDetailsId$ = createShared
            ? this.sharedDetailsProvider.createMultipart(sharedFormData as FormData).pipe(map((r: any) => r?.id ?? null))
            : of(this.form.value.sharedDetailsId ?? null);

        forkJoin({
            addressId: addressId$,
            sharedDetailsId: sharedDetailsId$
        })
        .pipe(
            switchMap(({ addressId, sharedDetailsId }) => {
                const payload: Partial<Company> = {
                    companyName: this.form.value.companyName!,
                    commerciallyActive: this.form.value.commerciallyActive!,
                    parentId: this.form.value.parentId ?? null,
                    addressId: addressId ?? null,
                    sharedDetailsId: sharedDetailsId ?? null
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
                // Passer en mode création
                idCtrl.setValue(null, { emitEvent: false });
                idCtrl.clearValidators();
                idCtrl.disable({ emitEvent: false });

                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        // réapplique required si pertinent
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
            } else {
                // Revenir en sélection
                grp.disable({ emitEvent: false });
                grp.reset({}, { emitEvent: false });

                // addressId/sharedDetailsId ne sont pas required pour Company, on nettoie seulement
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
}
