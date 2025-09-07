import {Component, inject, input, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {
    Address,
    City,
    ConstructionSite,
    Customer,
    MaterialSupplier,
    Product,
    PurchaseOrder,
    SharedDetails
} from '@core/models';
import {AddressProvider, ProductProvider, PurchaseOrderProvider, SharedDetailsProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent, SharedDetailsFormComponent} from '@core/components/form';
import {DateTimeService} from '@core/services/datetime.service';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SectionCreateMode} from '@core/types';

@Component({
    selector: 'app-purchase-order-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
        SharedDetailsFormComponent,
    ],
    templateUrl: './purchase-order-update.component.html'
})
export class PurchaseOrderUpdateComponent extends BaseUpdateComponent {
    customers = input<Customer[]>();
    constructionSites = input<ConstructionSite[]>();
    products = input<Product[]>();
    sharedDetails = input<SharedDetails[]>();

    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);

    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Mettre à jour la commande';
    sections  = {
        customer: {key:"customer",title: "Client"},
        constructionSite: {key:"constructionSite",title: "Chantier"},
        product: {key:"product",title: "Produit"},
        schedule: {key:"schedule",title: "Horaire"},
        sharedDetails: {key:"sharedDetails",title: "Détails",addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            id: [], // Ajout de l'id manquant
            requestedDeliveryBegin: ['', Validators.required],
            requestedDeliveryEnd: [],
            quantityOrdered: ['', [Validators.required, Validators.min(0)]],
            customerId: [],
            constructionSiteId: [],
            productId: ['', Validators.required],
            sharedDetailsId: [],
            sharedDetails: this.formBuilder.group({
                label: ['', Validators.required],
                fileName: [],
                notes: [],
            }),
        });

        form.get('sharedDetails')?.disable({ emitEvent: false });
        form.get('constructionSite')?.disable({ emitEvent: false });

        return form;
    }

    public update(): void {
        const createOrderShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

        const shared$ = createOrderShared ? this.sharedDetailsProvider.create((this.form.get('sharedDetails') as FormGroup).getRawValue()) : of(null);

        forkJoin([shared$]).pipe(
            switchMap(([shared]) => {

                const beginIso = this.dateTimeService.convertDatetimeLocalToIso(this.form.value.requestedDeliveryBegin) ?? undefined;
                const endIso = this.dateTimeService.convertDatetimeLocalToIso(this.form.value.requestedDeliveryEnd) ?? undefined;

                const payload: Partial<PurchaseOrder> = {
                    requestedDeliveryBegin: beginIso,
                    requestedDeliveryEnd: endIso,
                    quantityOrdered: this.form.value.quantityOrdered,
                    customerId: this.form.value.customerId,
                    constructionSiteId: this.form.value.constructionSiteId,
                    productId: this.form.value.productId,
                    sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId
                };
                return this.purchaseOrderProvider.update(payload);
            })
        )
        .subscribe({
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
                console.error('Erreur lors de la création de la commande:', error);
            }
        });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {
        const { key, create } = $event;

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath) as FormGroup;

            if (!idCtrl || !grp) return;

            if (create) {
                idCtrl.clearValidators();
                idCtrl.setValue(null);
                idCtrl.disable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });

                grp.enable({ emitEvent: false });
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({ emitEvent: false });
                    });
                }
                grp.updateValueAndValidity({ emitEvent: false });
            } else {
                grp.disable({ emitEvent: false });
                grp.reset({}, { emitEvent: false });
                grp.updateValueAndValidity({ emitEvent: false });

                idCtrl.clearValidators();
                idCtrl.enable({ emitEvent: false });
                idCtrl.updateValueAndValidity({ emitEvent: false });
            }

            this.form.updateValueAndValidity();
        };

        switch (key) {
            case 'sharedDetails': toggle('sharedDetailsId', 'sharedDetails', true); break;
            case 'constructionSite': toggle('constructionSiteId', 'constructionSite', true); break;
        }
    }

    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }
}
