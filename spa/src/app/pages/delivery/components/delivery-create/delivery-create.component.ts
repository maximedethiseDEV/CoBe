import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {DeliveryProvider} from '@core/providers';
import {
    Delivery,
    PurchaseOrder,
    TransportSupplier,
    DeliveryOrderNumber,
    DeliveryStatus
} from '@core/models';
import {CommonModule} from '@angular/common';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {DateTimeService} from '@core/services/datetime.service';
import {SectionCreateMode} from '@core/types';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-delivery-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        CommonModule,
        SubmitButtonComponent,
        SectionFomComponent,
        HeaderFormComponent,
    ],
    templateUrl: './delivery-create.component.html'
})
export class DeliveryCreateComponent extends BaseCreateComponent {
    purchaseOrders = input<PurchaseOrder[]>();
    transportSuppliers = input<TransportSupplier[]>();
    deliveryOrderNumbers = input<DeliveryOrderNumber[]>();
    deliveryStatus = input<DeliveryStatus[]>();
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);
    public featurePath: string = 'deliveries';
    public labelHeader: string = 'Nouvelle livraison';
    protected sections  = {
        order: {key:"order",title: "Commande"},
        transport: {key:"transport",title: "Chantier"},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const DATEDEFAULT = new Date();
        DATEDEFAULT.setDate(DATEDEFAULT.getDate() + 1);
        DATEDEFAULT.setHours(8, 0, 0, 0);
        const DATEDEFAULTLOCAL = new Date(DATEDEFAULT.getTime() - DATEDEFAULT.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

        return new FormGroup({
            actualDeliveryBegin: new FormControl(DATEDEFAULTLOCAL, Validators.required),
            actualDeliveryEnd: new FormControl(DATEDEFAULTLOCAL),
            quantity: new FormControl("",[Validators.required, Validators.min(0)]),
            statusId: new FormControl("",Validators.required),
            transportSupplierId: new FormControl(),
            orderId: new FormControl("",Validators.required),
            deliveryOrderNumberId: new FormControl(),
        });
    }

    public create(): void {
        const delivery : Delivery = this.form.getRawValue();

        const payload: Delivery = {
            ...delivery,
            actualDeliveryBegin: this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryBegin),
            actualDeliveryEnd: this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryEnd),
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

    onSectionCreateModeChange($event: SectionCreateMode) {

    }
}
