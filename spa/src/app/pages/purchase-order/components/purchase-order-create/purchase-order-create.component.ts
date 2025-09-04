import {Component, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {PurchaseOrderProvider, SharedDetailsProvider} from '@core/providers';
import {Product, SharedDetails, ConstructionSite, Customer, PurchaseOrder} from '@core/models';
import {DateTimeService} from '@core/services/datetime.service';
import {CommonModule} from '@angular/common';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/accordion-fom/section-fom.component';
import {of, map, concatMap} from 'rxjs';
import {SectionCreateConfig} from '@core/types';

@Component({
    selector: 'app-purchase-order-create',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
        SectionFomComponent,
    ],
    templateUrl: './purchase-order-create.component.html'
})
export class PurchaseOrderCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    constructionSites = input<ConstructionSite[]>();
    products = input<Product[]>();
    sharedDetails = input<SharedDetails[]>();
    formSharedDetails = signal<FormGroup>(new FormGroup({}));
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);
    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Nouvelle commande';
    protected sections  = {
        customer: {key:"customer",title: "Client"},
        constructionSite: {key:"constructionSite",title: "Chantier"},
        product: {key:"product",title: "Produit"},
        sharedDetails: {key:"sharedDetails",title: "Détails",addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const DATEDEFAULT = new Date();
        DATEDEFAULT.setDate(DATEDEFAULT.getDate() + 1);
        DATEDEFAULT.setHours(8, 0, 0, 0);

        const DATEDEFAULTLOCAL = new Date(DATEDEFAULT.getTime() - DATEDEFAULT.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

        return new FormGroup({
            requestedDeliveryBegin: new FormControl(DATEDEFAULTLOCAL, Validators.required),
            requestedDeliveryEnd: new FormControl(DATEDEFAULTLOCAL),
            quantityOrdered: new FormControl("", [Validators.required, Validators.min(0)]),
            customerId: new FormControl(),
            constructionSiteId: new FormControl(),
            productId: new FormControl("", Validators.required),
            sharedDetailsId: new FormControl()
        });
    }



    public create(): void {
        const formValue: PurchaseOrder = this.form.getRawValue();

        // Prépare FormData pour un éventuel upload
        const sharedDetailsForm = this.formSharedDetails().getRawValue();
        const sharedDetailsFormData = new FormData();
        if (sharedDetailsForm.fileName) sharedDetailsFormData.append('file', sharedDetailsForm.fileName);
        if (sharedDetailsForm.notes) sharedDetailsFormData.append('notes', sharedDetailsForm.notes);

        // Observable qui résout l'ID des détails partagés:
        // - si création: upload multipart puis récupère l'ID
        // - sinon: prend la valeur du champ existant (ou '')
        const sharedDetailsId$ = this.sections.sharedDetails
            ? this.sharedDetailsProvider.createMultipart(sharedDetailsFormData).pipe(
                map((r: any) => r?.id as string ?? '')
            )
            : of(this.form.get('sharedDetailsId')?.value ?? '');

        sharedDetailsId$
            .pipe(
                concatMap((resolvedSharedDetailsId) => {
                    const payload: PurchaseOrder = {
                        ...formValue,
                        sharedDetailsId: resolvedSharedDetailsId || '',
                        requestedDeliveryBegin: this.dateTimeService.convertDatetimeLocalToIso(formValue.requestedDeliveryBegin),
                        requestedDeliveryEnd: this.dateTimeService.convertDatetimeLocalToIso(formValue.requestedDeliveryEnd),
                    } as PurchaseOrder;

                    return this.purchaseOrderProvider.create(payload);
                })
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Commande enregistrée',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la création de la commande:", error);
                }
            });
    }

    onSectionCreateModeChange($event: SectionCreateConfig) {

    }
}
