import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {PurchaseOrderProvider, SharedDetailsProvider, AddressProvider, ContactProvider, ConstructionSiteProvider} from '@core/providers';
import {Product, SharedDetails, ConstructionSite, Customer, PurchaseOrder} from '@core/models';
import {DateTimeService} from '@core/services/datetime.service';
import {CommonModule} from '@angular/common';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {forkJoin, of} from 'rxjs';
import {SectionCreateMode} from '@core/types';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {switchMap, map} from 'rxjs/operators';
// ... existing code ...
@Component({
    selector: 'app-purchase-order-create',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
        SectionFomComponent,
        HeaderFormComponent,
    ],
    templateUrl: './purchase-order-create.component.html'
})
export class PurchaseOrderCreateComponent extends BaseCreateComponent {
    customers = input<Customer[]>();
    constructionSites = input<ConstructionSite[]>();
    products = input<Product[]>();
    sharedDetails = input<SharedDetails[]>();

    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    private dateTimeService: DateTimeService = inject(DateTimeService);

    public featurePath: string = 'purchase-orders';
    public labelHeader: string = 'Nouvelle commande';
    sections  = {
        customer: {key:"customer",title: "Client"},
        constructionSite: {key:"constructionSite",title: "Chantier"},
        product: {key:"product",title: "Produit"},
        schedule: {key:"schedule",title: "Horaire"},
        sharedDetails: {key:"sharedDetails",title: "Détails",addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const DATEDEFAULT = new Date();
        DATEDEFAULT.setDate(DATEDEFAULT.getDate() + 1);
        DATEDEFAULT.setHours(8, 0, 0, 0);

        const DATEDEFAULTLOCAL = new Date(DATEDEFAULT.getTime() - DATEDEFAULT.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

        const form = this.formBuilder.group({
            requestedDeliveryBegin: [DATEDEFAULTLOCAL, Validators.required],
            requestedDeliveryEnd: [DATEDEFAULTLOCAL],
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

    public create(): void {
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
                return this.purchaseOrderProvider.create(payload as PurchaseOrder);
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
