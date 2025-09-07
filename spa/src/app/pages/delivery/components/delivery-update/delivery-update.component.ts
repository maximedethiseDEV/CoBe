import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Delivery, DeliveryOrderNumber, DeliveryStatus, PurchaseOrder, TransportSupplier, SharedDetails} from '@core/models';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {CommonModule} from '@angular/common';
import {DateTimeService} from '@core/services/datetime.service';
import {SectionCreateMode} from '@core/types';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {DeliveryProvider, SharedDetailsProvider} from '@core/providers';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
        SharedDetailsFormComponent,
    ],
    templateUrl: './delivery-update.component.html'
})
export class DeliveryUpdateComponent extends BaseUpdateComponent {
    purchaseOrders = input<PurchaseOrder[]>();
    transportSuppliers = input<TransportSupplier[]>();
    deliveryOrderNumbers = input<DeliveryOrderNumber[]>();
    deliveryStatus = input<DeliveryStatus[]>();
    sharedDetails = input<SharedDetails[]>();

    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);

    public featurePath: string = 'deliveries';
    public labelHeader: string = 'Mettre à jour la livraison';

    protected sections  = {
        order: {key:"order",title: "Commande"},
        transport: {key:"transport",title: "Transport"},
        schedule: {key:"schedule",title: "Horaire"},
        sharedDetails: {key:"sharedDetails",title: "Détails", addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = new FormGroup({
            id: new FormControl(),
            actualDeliveryBegin: new FormControl("", Validators.required),
            actualDeliveryEnd: new FormControl(),
            quantity: new FormControl("", [Validators.required, Validators.min(0)]),
            statusId: new FormControl("", Validators.required),
            transportSupplierId: new FormControl(),
            orderId: new FormControl("", Validators.required),
            deliveryOrderNumberId: new FormControl(),
            // sous-groupe pour création de détails
            sharedDetails: new FormGroup({
                label: new FormControl('', Validators.required),
                fileName: new FormControl(),
                notes: new FormControl(),
            }),
        });

        form.get('sharedDetails')?.disable({ emitEvent: false });
        return form;
    }

    public update(): void {
        const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;
        const shared$ = createShared
            ? this.sharedDetailsProvider.create((this.form.get('sharedDetails') as FormGroup).getRawValue())
            : of(null);

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

                    return this.deliveryProvider.update(payload);
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
                    console.error("Erreur lors de la modification de la livraison:", error);
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
