import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {
    Delivery, DeliveryOrderNumber, DeliveryStatus,
    PurchaseOrder,
    TransportSupplier
} from '@core/models';
import {DeliveryProvider} from '@core/providers';

@Component({
    selector: 'app-delivery-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './delivery-update.component.html'
})
export class DeliveryUpdateComponent extends BaseUpdateComponent {
    @Input() purchaseOrders: PurchaseOrder[] = [];
    @Input() transportSuppliers: TransportSupplier[] = [];
    @Input() deliveryOrderNumbers: DeliveryOrderNumber[] = [];
    @Input() deliveryStatus: DeliveryStatus[] = [];
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    public featurePath: string = 'deliveries';
    public labelHeader: string = 'Mettre à jour la livraison';


    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            actualDeliveryBegin: new FormControl("",Validators.required,),
            actualDeliveryEnd: new FormControl(),
            quantity: new FormControl("",[Validators.required, Validators.min(0)]),
            statusId: new FormControl(),
            transportSupplierId: new FormControl(),
            orderId: new FormControl(),
            deliveryOrderNumberId: new FormControl(),
        });
    }

    public update(): void {
        const delivery : Delivery = this.form.getRawValue();

        const payload: Delivery = {
            ...delivery,
            actualDeliveryBegin: this.toInstantIso(delivery.actualDeliveryBegin),
            actualDeliveryEnd: this.toInstantIso(delivery.actualDeliveryEnd),
        } as Delivery;


        this.deliveryProvider.create(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Livraison enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création de la livraison:", error);
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
