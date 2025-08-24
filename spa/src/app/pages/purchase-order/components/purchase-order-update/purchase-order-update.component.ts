import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {
    Address,
    City,
    ConstructionSite,
    Customer,
    MaterialSupplier,
    Product,
    PurchaseOrder,
    SharedDetails
} from '@core/models';
import {AddressProvider, ProductProvider, PurchaseOrderProvider} from '@core/providers';

@Component({
    selector: 'app-purchase-order-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './purchase-order-update.component.html'
})
export class PurchaseOrderUpdateComponent extends BaseUpdateComponent {
    @Input() customers: Customer[] = [];
    @Input() constructionSites: ConstructionSite[] = [];
    @Input() products: Product[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Mettre à jour la commande';


    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            requestedDeliveryBegin: new FormControl("",Validators.required),
            requestedDeliveryEnd: new FormControl(),
            quantityOrdered: new FormControl("",[Validators.required, Validators.min(0)]),
            customerId: new FormControl(),
            deliveryCustomerId: new FormControl(),
            constructionSiteId: new FormControl(),
            productId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl()
        });
    }

    public update(): void {
        const purchaseOrder : PurchaseOrder = this.form.getRawValue();

        this.purchaseOrderProvider.update(purchaseOrder).subscribe({
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
