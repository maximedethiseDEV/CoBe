import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {
    Address,
    City,
    Company,
    Contact,
    Country,
    Customer, DeliveryOrderNumber,
    Product,
    SharedDetails,
    TransportSupplier
} from '@core/models';
import {AddressProvider, CompanyProvider, CustomerProvider, DeliveryOrderNumberProvider} from '@core/providers';

@Component({
    selector: 'app-company-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './delivery-order-number-update.component.html'
})
export class DeliveryOrderNumberUpdateComponent extends BaseUpdateComponent {
    @Input() transportSuppliers: TransportSupplier[] = [];
    @Input() customers: Customer[] = [];
    @Input() cities: City[] = [];
    @Input() products: Product[] = [];
    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public featurePath: string = 'delivery-order-numbers';
    public labelHeader: string = 'Mettre à jour le numéro de livraison';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            uniqueDeliveryOrderNumber: new FormControl("",Validators.required),
            transportSupplierId: new FormControl("",Validators.required),
            customerId: new FormControl("",Validators.required),
            cityId: new FormControl("",Validators.required),
            productId: new FormControl("",Validators.required)
        });
    }

    public update(): void {
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
