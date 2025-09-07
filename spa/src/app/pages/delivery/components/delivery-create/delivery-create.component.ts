import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {
    Delivery,
    PurchaseOrder,
    TransportSupplier,
    DeliveryOrderNumber,
    DeliveryStatus,
    SharedDetails
} from '@core/models';
import {CommonModule} from '@angular/common';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {DateTimeService} from '@core/services/datetime.service';
import {SectionCreateMode} from '@core/types';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {DeliveryProvider, SharedDetailsProvider} from '@core/providers';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SharedDetailsFormComponent} from '@core/components/form';

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
        SharedDetailsFormComponent,
    ],
    templateUrl: './delivery-create.component.html'
})
export class DeliveryCreateComponent extends BaseCreateComponent {
    purchaseOrders = input<PurchaseOrder[]>();
    transportSuppliers = input<TransportSupplier[]>();
    deliveryOrderNumbers = input<DeliveryOrderNumber[]>();
    deliveryStatus = input<DeliveryStatus[]>();
    sharedDetails = input<SharedDetails[]>();

    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);

    public featurePath: string = 'deliveries';
    public labelHeader: string = 'Nouvelle livraison';

    protected sections  = {
        order: {key:"order",title: "Commande"},
        transport: {key:"transport",title: "Transport"},
        schedule: {key:"schedule",title: "Horaire"},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const DATEDEFAULT = new Date();
        DATEDEFAULT.setDate(DATEDEFAULT.getDate() + 1);
        DATEDEFAULT.setHours(8, 0, 0, 0);
        const DATEDEFAULTLOCAL = new Date(DATEDEFAULT.getTime() - DATEDEFAULT.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

        return new FormGroup({
            actualDeliveryBegin: new FormControl(DATEDEFAULTLOCAL, Validators.required),
            actualDeliveryEnd: new FormControl(DATEDEFAULTLOCAL),
            quantity: new FormControl("", [Validators.required, Validators.min(0)]),
            statusId: new FormControl("", Validators.required),
            transportSupplierId: new FormControl(),
            orderId: new FormControl("", Validators.required),
            deliveryOrderNumberId: new FormControl(),
        });
    }

    public create(): void {
        const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;
        const shared$ = createShared ? this.sharedDetailsProvider.create((this.form.get('sharedDetails') as FormGroup).getRawValue()) : of(null);

        forkJoin([shared$])
            .pipe(
                switchMap(([_shared]) => {
                    const delivery: Delivery = this.form.getRawValue();

                    const beginIso = this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryBegin) ?? undefined;
                    const endIso = this.dateTimeService.convertDatetimeLocalToIso(delivery.actualDeliveryEnd) ?? undefined;

                    const payload: Delivery = {
                        ...delivery,
                        actualDeliveryBegin: beginIso,
                        actualDeliveryEnd: endIso,
                    } as Delivery;

                    return this.deliveryProvider.create(payload);
                })
            )
            .subscribe({
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
        const { key, create } = $event;

        const toggle = (groupPath: string, requiredOnGroup: boolean) => {
            const grp = this.form.get(groupPath) as FormGroup;
            if (!grp) return;

            if (create) {
                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
            } else {
                grp.disable({ emitEvent: false });
                grp.reset({}, { emitEvent: false });
                grp.updateValueAndValidity({ emitEvent: false });
            }

            this.form.updateValueAndValidity();
        };

        switch (key) {
            case 'sharedDetails': toggle('sharedDetails', true); break;
        }
    }

    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }
}
