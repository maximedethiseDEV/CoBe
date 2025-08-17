import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {PurchaseOrderProvider} from '@core/providers';
import {Product, SharedDetails, ConstructionSite, Customer, PurchaseOrder} from '@core/models';
import {DateTimeService} from '@core/services/datetime.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-product-create',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './purchase-order-create.component.html'
})
export class PurchaseOrderCreateComponent extends BaseCreateComponent {
    @Input() customers: Customer[] = [];
    @Input() constructionSites: ConstructionSite[] = [];
    @Input() products: Product[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);
    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Nouvelle commande';

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
