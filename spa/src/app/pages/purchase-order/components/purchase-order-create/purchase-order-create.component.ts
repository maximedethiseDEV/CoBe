import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {ConstructionSiteProvider, PurchaseOrderProvider, SharedDetailsProvider} from '@core/providers';
import {Product, SharedDetails, ConstructionSite, Customer, PurchaseOrder} from '@core/models';
import {DateTimeService} from '@core/services/datetime.service';
import {CommonModule} from '@angular/common';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-product-create',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
    ],
    templateUrl: './purchase-order-create.component.html'
})
export class PurchaseOrderCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    constructionSites = input<ConstructionSite[]>();
    products = input<Product[]>();
    sharedDetails = input<SharedDetails[]>();
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);
    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Nouvelle commande';
    protected statesPanel  = {
        customer: {opened: false,},
        constructionSite: {opened: false,},
        product: {opened: false,},
        sharedDetails: {opened: false, create: false}
    };

    public override generateForm(): FormGroup {
        return new FormGroup({
            requestedDeliveryBegin: new FormControl("",Validators.required,),
            requestedDeliveryEnd: new FormControl(),
            quantityOrdered: new FormControl("",[Validators.required, Validators.min(0)]),
            customerId: new FormControl(),
            constructionSiteId: new FormControl(),
            productId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl()
        });
    }

    public create(): void {
        const purchaseOrder : PurchaseOrder = this.form.getRawValue();

        const payload: PurchaseOrder = {
            ...purchaseOrder,
            requestedDeliveryBegin: this.dateTimeService.convertDatetimeLocalToIso(purchaseOrder.requestedDeliveryBegin),
            requestedDeliveryEnd: this.dateTimeService.convertDatetimeLocalToIso(purchaseOrder.requestedDeliveryEnd),
        } as PurchaseOrder;

        this.purchaseOrderProvider.create(payload).subscribe({
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
                console.error("Erreur lors de la création du commande:", error);
            }
        });
    }
}
