import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {TransportSupplierProvider} from '@core/providers';
import {TransportSupplier} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-transportSupplier-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class TransportSupplierTableComponent extends BaseTableComponent implements OnInit {
    private transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    public entityName: string = 'transport-suppliers';
    public filterFields: string[] = [
        'companyName',
        'hasParent',
        'cityName',
        'postalCode',
        'countryCode',
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
        this.setupSseConnection('transport-suppliers');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.transportSupplierProvider.getAll(params).subscribe({
            next: (response: Pagination<TransportSupplier>) => {
                this.entities = response.content.map(transportSupplier => ({
                    ...transportSupplier,
                    hasParent: !!transportSupplier.parentId
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

    protected override deleteEntity(transportSupplier: TransportSupplier): void {
        this.transportSupplierProvider.delete(transportSupplier.id).subscribe({
            next: () => {
                this.removeEntity(transportSupplier.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Transporteur supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du transporteur :', error);
            }
        });
    }
}
