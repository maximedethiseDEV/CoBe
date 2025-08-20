import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, Company, SharedDetails} from '@core/models';
import {CompanyProvider} from '@core/providers';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-company-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        NgClass,
    ],
    templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent extends BaseCreateComponent {
    @Input() addresses: Address[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    @Input() companies: Company[] = [];
    @Input() countries: any[] = [];
    private companyProvider: CompanyProvider = inject(CompanyProvider);
    public featurePath: string = 'companies';
    public labelHeader: string = 'Nouvelle entreprise';
    protected openedParent = false;
    protected openedCompany = false;
    protected openedAddress = false;
    protected openedSharedDetails = false;
    protected createMode = false;

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
            const company : Company = this.form.getRawValue();
            this.companyProvider.create(company).subscribe({
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
