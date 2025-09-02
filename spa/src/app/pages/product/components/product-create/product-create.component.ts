import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {ProductProvider} from '@core/providers';
import {Product, MaterialSupplier, SharedDetails} from '@core/models';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-product-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
    ],
    templateUrl: './product-create.component.html'
})
export class ProductCreateComponent extends BaseCreateComponent {
    @Input() materialSuppliers: MaterialSupplier[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private productProvider: ProductProvider = inject(ProductProvider);
    public featurePath: string = 'products';
    public labelHeader: string = 'Nouveau produit';

    public override generateForm(): FormGroup {
        return new FormGroup({
            code: new FormControl("",Validators.required),
            name: new FormControl("",Validators.required),
            materialSupplierId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl()
        });
    }

    public create(): void {
        const product : Product = this.form.getRawValue();

        this.productProvider.create(product).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Produit enregistrée',
                    life: 2000
                });
                this.back();
            },
            error: (error: Error) => {
                console.error("Erreur lors de la création du produit:", error);
            }
        });
    }
}
