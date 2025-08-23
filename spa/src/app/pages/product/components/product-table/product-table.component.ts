import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {ProductProvider} from '@core/providers';
import {Product} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-product-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ProductTableComponent extends BaseTableComponent<Product> implements OnInit {
    private productProvider: ProductProvider = inject(ProductProvider);
    public labelHeader: string = 'Liste des produits';
    public iconHeader = LucideIconsList.PackageOpen;
    public filterFields: string[] = [
        'code',
        'name',
        'companyName',
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'code',
            type:'text',
            translate: 'Code produit',
            sort: true
        },
        {
            key: 'name',
            type:'text',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'companyName',
            type:'text',
            translate: 'Fournisseur',
            sort: true
        }
    ];

    protected fetchAll(): Observable<Product[]> {
        return this.productProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.productProvider.delete(id);
    }
}
