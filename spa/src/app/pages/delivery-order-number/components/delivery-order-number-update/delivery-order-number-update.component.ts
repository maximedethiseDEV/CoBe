import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {City, Customer, DeliveryOrderNumber, Product, TransportSupplier} from '@core/models';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';

@Component({
    selector: 'app-delivery-order-number-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
    ],
    templateUrl: './delivery-order-number-update.component.html'
})
export class DeliveryOrderNumberUpdateComponent extends BaseUpdateComponent {
    transportSuppliers = input<TransportSupplier[]>();
    customers = input<Customer[]>();
    cities = input<City[]>();
    products = input<Product[]>();

    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public featurePath: string = 'delivery-order-numbers';
    public labelHeader: string = 'Mettre à jour le numéro de livraison';

    sections = {
        number: { key: 'number', title: 'Numéro de chargement*' },
        transport: { key: 'transport', title: 'Transporteur*' },
        customer: { key: 'customer', title: 'Client*' },
        city: { key: 'city', title: 'Ville*' },
        product: { key: 'product', title: 'Produit*' },
    };

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            uniqueDeliveryOrderNumber: new FormControl('', Validators.required),
            transportSupplierId: new FormControl('', Validators.required),
            customerId: new FormControl('', Validators.required),
            cityId: new FormControl('', Validators.required),
            productId: new FormControl('', Validators.required)
        });
    }

    public update(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload: Partial<DeliveryOrderNumber> = {
            id: this.form.value.id,
            uniqueDeliveryOrderNumber: this.form.value.uniqueDeliveryOrderNumber,
            transportSupplierId: this.form.value.transportSupplierId,
            customerId: this.form.value.customerId,
            cityId: this.form.value.cityId,
            productId: this.form.value.productId
        };
        this.deliveryOrderNumberProvider.update(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Numéro de livraison mis à jour',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error('Erreur lors de la mise à jour du numéro de livraison:', error);
            }
        });
    }
}
