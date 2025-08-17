import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Address, ConstructionSite, Contact, SharedDetails, Customer} from '@core/models';
import {ConstructionSiteProvider} from '@core/providers';

@Component({
    selector: 'app-constructionSite-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './construction-site-create.component.html'
})
export class ConstructionSiteCreateComponent extends BaseCreateComponent {
    @Input() customers: Customer[] = [];
    @Input() addresses: Address[] = [];
    @Input() contacts: Contact[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public featurePath: string = 'construction-sites';
    public labelHeader: string = 'Nouveau chantier';

    public override generateForm(): FormGroup {
        return new FormGroup({
            dateStart: new FormControl(),
            dateEnd: new FormControl(),
            customerId: new FormControl("",Validators.required),
            addressId: new FormControl("",Validators.required),
            contactId: new FormControl(),
            sharedDetailsId: new FormControl(),
        });
    }

    public create(): void {
        const constructionSite : ConstructionSite = this.form.getRawValue();
        this.constructionSiteProvider.create(constructionSite).subscribe({
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
}
