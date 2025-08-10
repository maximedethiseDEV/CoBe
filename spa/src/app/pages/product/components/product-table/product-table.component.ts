import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ProductProvider} from '@core/providers';
import {Product} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-product-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ProductTableComponent extends BaseTableComponent implements OnInit {
    private productProvider: ProductProvider = inject(ProductProvider);
    public entityName: string = 'product';
    public filterFields: string[] = [
        'code',
        'name',
        'companyName',
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'code',
            translate: 'Code produit',
            sort: true
        },
        {
            key: 'name',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'companyName',
            translate: 'Fournisseur',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('productes');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.productProvider.getAll(params).subscribe({
            next: (response: Pagination<Product>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les données'
                });
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    protected override deleteEntity(product: Product): void {
        this.productProvider.delete(product.id).subscribe({
            next: () => {
                this.removeEntity(product.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Produit supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du produit :', error);
            }
        });
    }
}
