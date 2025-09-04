import {Component, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Company, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider, SharedDetailsProvider} from '@core/providers';
import {AddressFormComponent} from '@core/components/form/address-form/address-form.component';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {concatMap, of, forkJoin, map} from 'rxjs';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/accordion-fom/section-fom.component';

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
    public featurePath: string = 'companies';
    public labelHeader: string = 'Nouvelle entreprise';
    sections  = {
        parent: {key:"parent", title:"Donneur d'ordre"},
        company: {key:"company",title:"Entreprise"},
        address: {key:"address",title:"Adresse",addCreateButton: true},
        sharedDetails: {key:"sharedDetails",title:"Détails",addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        return new FormGroup({
            companyName: new FormControl("",Validators.required),
            commerciallyActive: new FormControl(true),
            parentId: new FormControl(),
            addressId: new FormControl(),
            sharedDetailsId: new FormControl()
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
}
