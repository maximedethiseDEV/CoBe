import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Address, City, MaterialSupplier, Product, SharedDetails} from '@core/models';
import {AddressProvider, ProductProvider} from '@core/providers';

@Component({
    selector: 'app-product-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent extends BaseUpdateComponent {
    @Input() materialSuppliers: MaterialSupplier[] = [];
    @Input() sharedDetails: SharedDetails[] = [];
    private productProvider: ProductProvider = inject(ProductProvider);
    public featurePath: string = 'products';
    public labelHeader: string = 'Mettre à jour le produit';


    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            code: new FormControl("",Validators.required),
            name: new FormControl("",Validators.required),
            materialSupplierId: new FormControl("",Validators.required),
            sharedDetailsId: new FormControl()
        });
    }

    public update(): void {
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
