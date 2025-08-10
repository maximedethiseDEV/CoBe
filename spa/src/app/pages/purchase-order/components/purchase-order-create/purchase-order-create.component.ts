import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {ProductProvider, PurchaseOrderProvider} from '@core/providers';
import {Product, MaterialSupplier, SharedDetails, ConstructionSite, Customer, PurchaseOrder} from '@core/models';

@Component({
    selector: 'app-product-create',
    imports: [
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
    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Nouvelle commande';

    public override generateForm(): FormGroup {
        return new FormGroup({
            requestedDeliveryBegin: new FormControl("",Validators.required,),
            requestedDeliveryEnd: new FormControl(),
            quantityOrdered: new FormControl("",[Validators.required, Validators.min(0)]),
            billingCustomerId: new FormControl(),
            deliveryCustomerId: new FormControl(),
            constructionSiteId: new FormControl(),
            productId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl()
        });
    }

    public create(): void {
        const purchaseOrder : PurchaseOrder = this.form.getRawValue();

        const payload: PurchaseOrder = {
            ...purchaseOrder,
            requestedDeliveryBegin: this.toInstantIso(purchaseOrder.requestedDeliveryBegin),
            requestedDeliveryEnd: this.toInstantIso(purchaseOrder.requestedDeliveryEnd),
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

    private toInstantIso(dateInput?: string | null): string | null {
        if (!dateInput) return null;

        // Si input type="date": "YYYY-MM-DD" -> fixer à minuit UTC
        // Si input type="datetime-local": "YYYY-MM-DDTHH:mm" -> l'interprétez en local puis convertissez en UTC
        // Ici on accepte les deux cas :
        const hasTime = dateInput.includes('T');
        if (hasTime) {
            // "YYYY-MM-DDTHH:mm" (sans timezone) -> interprétation locale -> ISO UTC
            const d = new Date(dateInput);
            return isNaN(d.getTime()) ? null : d.toISOString();
        } else {
            // "YYYY-MM-DD" -> minuit UTC ce jour-là
            return `${dateInput}T00:00:00.000Z`;
        }
    }

}
