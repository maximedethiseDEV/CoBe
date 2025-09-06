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
    formAddress = signal<FormGroup>(new FormGroup({}));
    formSharedDetails = signal<FormGroup>(new FormGroup({}));
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
        return this.formBuilder.group({
            companyName: ['', Validators.required],
            commerciallyActive: [true, Validators.required],
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
    }


    public create(): void {
        const company: Company = this.form.getRawValue();
        const address: Address = this.formAddress().getRawValue();
        const sharedDetailsForm = this.formSharedDetails().getRawValue();

        const sharedDetailsFormData = new FormData();
        if (sharedDetailsForm.fileName) sharedDetailsFormData.append('file', sharedDetailsForm.fileName);
        if (sharedDetailsForm.notes) sharedDetailsFormData.append('notes', sharedDetailsForm.notes);

        const addressId$ = this.sections.address
            ? this.addressProvider.create(address).pipe(
                map((r: any) => r?.id as string ?? '')
            )
            : of(this.form.get('addressId')?.value ?? '');

        const sharedDetailsId$ = this.sections.sharedDetails
            ? this.sharedDetailsProvider.createMultipart(sharedDetailsFormData).pipe(
                map((r: any) => r?.id as string ?? '')
            )
            : of('');

        forkJoin([addressId$, sharedDetailsId$])
            .pipe(
                concatMap(([resolvedAddressId, resolvedSharedDetailsId]) => {
                    company.addressId = resolvedAddressId || '';
                    company.sharedDetailsId = resolvedSharedDetailsId || '';
                    return this.companyProvider.create(company);
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

        switch (key) {
            case 'address': {
                if (create) {
                    this.form.get('addressId')?.disable();
                    this.form.get('address')?.enable();
                    break;
                } else {
                    this.form.get('address')?.disable();
                    this.form.get('addressId')?.enable();
                    break;
                }
            }
            case 'sharedDetails': {
                if (create) {
                    this.form.get('sharedDetailsId')?.disable();
                    this.form.get('sharedDetails')?.enable();
                    break;
                } else {
                    this.form.get('sharedDetails')?.disable();
                    this.form.get('sharedDetailsId')?.enable();
                    break;
                }
            }
        }
    }
}
