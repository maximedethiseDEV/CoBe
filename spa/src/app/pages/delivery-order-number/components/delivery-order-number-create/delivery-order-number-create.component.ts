import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {
    DeliveryOrderNumber,
    TransportSupplier,
    City,
    Product,
    Customer
} from '@core/models';
import {DeliveryOrderNumberProvider} from '@core/providers';

@Component({
    selector: 'app-delivery-order-number-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './delivery-order-number-create.component.html'
})
export class DeliveryOrderNumberCreateComponent extends BaseCreateComponent {
    @Input() transportSuppliers: TransportSupplier[] = [];
    @Input() customers: Customer[] = [];
    @Input() cities: City[] = [];
    @Input() products: Product[] = [];
    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public featurePath: string = 'delivery-order-numbers';
    public labelHeader: string = 'Nouveau numéro de livraison';

    public override generateForm(): FormGroup {
        return new FormGroup({
            uniqueDeliveryOrderNumber: new FormControl("",Validators.required),
            transportSupplierId: new FormControl("",Validators.required),
            customerId: new FormControl("",Validators.required),
            cityId: new FormControl("",Validators.required),
            productId: new FormControl("",Validators.required)
        });
    }

    public create(): void {
        const deliveryOrderNumber : DeliveryOrderNumber = this.form.getRawValue();
        this.deliveryOrderNumberProvider.create(deliveryOrderNumber).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Numéro de livraison enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du numéro de livraison:", error);
            }
        });
    }
}
