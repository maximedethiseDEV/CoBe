import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {MaterialSupplierProvider} from '@core/providers';
import {MaterialSupplier} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-materialSupplier-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class MaterialSupplierTableComponent extends BaseTableComponent implements OnInit {
    private materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    public entityName: string = 'material-suppliers';
    public filterFields: string[] = [
        'companyName',
        'hasParent',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'companyName',
            type:'text',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'cityName',
            type:'text',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'postalCode',
            type:'text',
            translate: 'Code postal',
            sort: true
        },
        {
            key: 'countryCode',
            type:'text',
            translate: 'Pays',
            sort: true
        },
        {
            key: 'hasParent',
            type:'text',
            translate: 'Sous-traitant',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('material-suppliers');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.materialSupplierProvider.getAll(params).subscribe({
            next: (response: Pagination<MaterialSupplier>) => {
                this.entities = response.content.map(materialSupplier => ({
                    ...materialSupplier,
                    hasParent: !!materialSupplier.parentId
                }));
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

    protected override deleteEntity(materialSupplier: MaterialSupplier): void {
        this.materialSupplierProvider.delete(materialSupplier.id).subscribe({
            next: () => {
                this.removeEntity(materialSupplier.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Fournisseur supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du fournisseur :', error);
            }
        });
    }
}
