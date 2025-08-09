import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, City, Company, Contact, Country, SharedDetails} from '@core/models';
import {AddressProvider, CompanyProvider} from '@core/providers';
import {SelectCityFromAddressPipe} from '@core/pipe/select-city-from-address.pipe';

@Component({
    selector: 'app-company-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SelectCityFromAddressPipe
    ],
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent extends BaseUpdateComponent {
    @Input() addresses: Address[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private companyProvider: CompanyProvider = inject(CompanyProvider);
    public featurePath: string = 'companies';
    public labelHeader: string = 'Nouvelle entreprise';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            companyName: new FormControl("",Validators.required),
            addressId: new FormControl(),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl()
        });
    }

    public update(): void {
        if (this.form.valid ) {
            const company : Company = this.form.getRawValue();

            this.companyProvider.create(company).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Adresse enregistrée',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la création de l'adresse:", error);
                }
            });
        }
    }
}
