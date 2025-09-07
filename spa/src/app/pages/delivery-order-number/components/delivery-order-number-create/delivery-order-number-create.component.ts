import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {DeliveryOrderNumber, TransportSupplier, City, Product, Customer} from '@core/models';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';

@Component({
    selector: 'app-delivery-order-number-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
    ],
    templateUrl: './delivery-order-number-create.component.html'
})
export class DeliveryOrderNumberCreateComponent extends BaseCreateComponent {
    transportSuppliers = input<TransportSupplier[]>();
    customers = input<Customer[]>();
    cities = input<City[]>();
    products = input<Product[]>();

    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public featurePath: string = 'delivery-order-numbers';
    public labelHeader: string = 'Nouveau numéro de livraison';

    sections = {
        number: { key: 'number', title: 'Numéro de chargement*' },
        transport: { key: 'transport', title: 'Transporteur*' },
        customer: { key: 'customer', title: 'Client*' },
        city: { key: 'city', title: 'Ville*' },
        product: { key: 'product', title: 'Produit*' },
    };

    public override generateForm(): FormGroup {
        return new FormGroup({
            uniqueDeliveryOrderNumber: new FormControl('', Validators.required),
            transportSupplierId: new FormControl('', Validators.required),
            customerId: new FormControl('', Validators.required),
            cityId: new FormControl('', Validators.required),
            productId: new FormControl('', Validators.required)
        });
    }

    public create(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload: DeliveryOrderNumber = this.form.getRawValue();
        this.deliveryOrderNumberProvider.create(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Numéro de livraison enregistré',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error('Erreur lors de la création du numéro de livraison:', error);
            }
        });
    }
}
