import {Component, inject, input, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {
    Delivery, DeliveryOrderNumber, DeliveryStatus,
    PurchaseOrder,
    TransportSupplier
} from '@core/models';
import {DeliveryProvider} from '@core/providers';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {CommonModule} from '@angular/common';
import {DateTimeService} from '@core/services/datetime.service';
import {SectionCreateMode} from '@core/types';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-delivery-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        CommonModule,
        SectionFomComponent,
        SubmitButtonComponent,
        HeaderFormComponent,
    ],
    templateUrl: './delivery-update.component.html'
})
export class DeliveryUpdateComponent extends BaseUpdateComponent {
    purchaseOrders = input<PurchaseOrder[]>();
    transportSuppliers = input<TransportSupplier[]>();
    deliveryOrderNumbers = input<DeliveryOrderNumber[]>();
    deliveryStatus = input<DeliveryStatus[]>();
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);
    public featurePath: string = 'deliveries';
    public labelHeader: string = 'Mettre à jour la livraison';
    protected sections  = {
        order: {key:"order",title: "Commande"},
        transport: {key:"transport",title: "Chantier"},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };


    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            actualDeliveryBegin: new FormControl("", Validators.required),
            actualDeliveryEnd: new FormControl(),
            quantity: new FormControl("",[Validators.required, Validators.min(0)]),
            statusId: new FormControl("",Validators.required),
            transportSupplierId: new FormControl(),
            orderId: new FormControl("",Validators.required),
            deliveryOrderNumberId: new FormControl(),
        });
    }

    public update(): void {
        const delivery : Delivery = this.form.getRawValue();

        const payload: Delivery = {
            ...delivery,
            actualDeliveryBegin: this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryBegin),
            actualDeliveryEnd: this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryEnd),
        } as Delivery;

        this.deliveryProvider.update(payload).subscribe({
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
                console.error("Erreur lors de la modification de la livraison:", error);
            }
        });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {

    }
}
