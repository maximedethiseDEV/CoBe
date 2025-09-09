import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {ProductProvider, SharedDetailsProvider} from '@core/providers';
import {Product, MaterialSupplier, SharedDetails} from '@core/models';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
    HeaderFormComponent,
    SectionFomComponent,
    SubmitButtonComponent,
    SharedDetailsFormComponent
} from '@core/components/form';
import {SectionCreateMode} from '@core/types';

@Component({
    selector: 'app-product-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
        SharedDetailsFormComponent
    ],
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent extends BaseUpdateComponent {
    materialSuppliers = input<MaterialSupplier[]>();
    sharedDetails = input<SharedDetails[]>();

    private productProvider: ProductProvider = inject(ProductProvider);
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);

    public featurePath: string = 'products';
    public labelHeader: string = 'Mettre à jour le produit';

    sections = {
        product: {key: 'product', title: 'Produit*'},
        materialSupplier: {key: 'materialSupplier', title: 'Fournisseur*'},
        sharedDetails: {key: 'sharedDetails', title: 'Détails', addCreateButton: true}
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            id: [],
            codeAS400: ['', Validators.required],
            codeSAP: ['', Validators.required],
            nameShort: ['', Validators.required],
            materialSupplierId: ['', Validators.required],
            sharedDetailsId: [],
            sharedDetails: this.formBuilder.group({
                label: ['', Validators.required],
                fileName: [],
                notes: [],
            }),
        });

        form.get('sharedDetails')?.disable({emitEvent: false});
        return form;
    }

    public update(): void {
        const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

        const shared$ = createShared
            ? this.sharedDetailsProvider.create(this.form.get('sharedDetails')!.getRawValue())
            : of(null);

        forkJoin([shared$])
            .pipe(
                switchMap(([shared]) => {
                    const payload: Partial<Product> = {
                        id: this.form.value.id,
                        codeAS400: this.form.value.codeAS400,
                        codeSAP: this.form.value.codeSAP,
                        nameShort: this.form.value.name,
                        materialSupplierId: this.form.value.materialSupplierId,
                        sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId ?? null,
                    };
                    return this.productProvider.update(payload);
                })
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Produit mis à jour',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la mise à jour du produit:', error);
                }
            });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {
        const {key, create} = $event;

        const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
            const idCtrl = this.form.get(idCtrlPath);
            const grp = this.form.get(groupPath) as FormGroup;

            if (!idCtrl || !grp) return;

            if (create) {
                idCtrl.clearValidators();
                idCtrl.setValue(null);
                idCtrl.disable({emitEvent: false});
                idCtrl.updateValueAndValidity({emitEvent: false});

                grp.enable({emitEvent: false});
                if (requiredOnGroup) {
                    Object.values(grp.controls).forEach(c => {
                        c.addValidators(Validators.required);
                        c.updateValueAndValidity({emitEvent: false});
                    });
                }
                grp.updateValueAndValidity({emitEvent: false});
            } else {
                grp.disable({emitEvent: false});
                grp.reset({}, {emitEvent: false});
                grp.updateValueAndValidity({emitEvent: false});

                idCtrl.clearValidators();
                idCtrl.enable({emitEvent: false});
                idCtrl.updateValueAndValidity({emitEvent: false});
            }

            this.form.updateValueAndValidity();
        };

        switch (key) {
            case 'sharedDetails':
                toggle('sharedDetailsId', 'sharedDetails', true);
                break;
        }
    }

    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }
}
