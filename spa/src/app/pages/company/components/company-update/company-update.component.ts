import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, Company, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider, SharedDetailsProvider} from '@core/providers';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-company-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SectionFomComponent,
        AddressFormComponent,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
        HeaderFormComponent,
    ],
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent extends BaseUpdateComponent {
    addresses = input<Address[]>();
    sharedDetails = input<SharedDetails[]>();
    companies = input<Company[]>();

    private companyProvider: CompanyProvider = inject(CompanyProvider);
    private addressProvider: AddressProvider = inject(AddressProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);

    public featurePath: string = 'companies';
    public labelHeader: string = 'Mettre à jour l\'entreprise';

    sections  = {
        parent: {key:"parent", title:"Donneur d'ordre"},
        company: {key:"company", title:"Entreprise"},
        address: {key:"address", title:"Adresse", addCreateButton: true},
        sharedDetails: {key:"sharedDetails", title:"Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            id: [],
            companyName: ['', Validators.required],
            commerciallyActive: [true, Validators.required],
            codeAS400: ['',Validators.required],
            codeSAP: ['',Validators.required],
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

        form.get('address')?.disable({ emitEvent: false });
        form.get('sharedDetails')?.disable({ emitEvent: false });

        return form;
    }

    public update(): void {
        const createAddress = this.form.get('address')?.enabled && this.form.get('address')?.valid;
        const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

        const address$ = createAddress ? this.addressProvider.create(this.form.get('address')!.getRawValue()) : of(null);
        const shared$  = createShared  ? this.sharedDetailsProvider.create(this.form.get('sharedDetails')!.getRawValue()) : of(null);

        forkJoin([address$, shared$]).pipe(
                switchMap(([address, shared]) => {
                    const payload: Partial<Company> = {
                        id: this.form.value.id,
                        codeSAP: this.form.value.codeSAP,
                        codeAS400: this.form.value.codeAS400,
                        companyName: this.form.value.companyName!,
                        commerciallyActive: this.form.value.commerciallyActive,
                        parentId: this.form.value.parentId,
                        addressId: address?.id ?? this.form.value.addressId,
                        sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId
                    };
                    return this.companyProvider.update(payload);
                })
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Entreprise mise à jour',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la mise à jour de l'entreprise:", error);
            }
        });
    }

    onSectionCreateModeChange($event: { key: string; create: boolean }) {
        const { key, create } = $event;

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath) as FormGroup;
            if (!idCtrl || !grp) return;

            if (create) {
                idCtrl.clearValidators();
                idCtrl.setValue(null);
                idCtrl.disable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });

                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
                grp.updateValueAndValidity({ emitEvent: false });
            } else {
                grp.disable({ emitEvent: false });
                grp.reset({}, { emitEvent: false });
                grp.updateValueAndValidity({ emitEvent: false });
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
