import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {DeliveryOrderNumber} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-deliveryOrderNumber-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class DeliveryOrderNumberTableComponent extends BaseTableComponent implements OnInit {
    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public entityName: string = 'deliveryOrderNumber';
    public filterFields: string[] = [
        'uniqueDeliveryOrderNumber',
        'transportSupplierName',
        'customerName',
        'cityName',
        'code'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'uniqueDeliveryOrderNumber',
            translate: 'Numéro',
            sort: true
        },
        {
            key: 'transportSupplierName',
            translate: 'Transporteur',
            sort: true
        },
        {
            key: 'customerName',
            translate: 'Client',
            sort: true
        },
        {
            key: 'cityName',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'code',
            translate: 'Produit',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('unique-delivery-numbers');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.deliveryOrderNumberProvider.getAll(params).subscribe({
            next: (response: Pagination<DeliveryOrderNumber>) => {
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

    protected override deleteEntity(deliveryOrderNumber: DeliveryOrderNumber): void {
        this.deliveryOrderNumberProvider.delete(deliveryOrderNumber.id).subscribe({
            next: () => {
                this.removeEntity(deliveryOrderNumber.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Client supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du client :', error);
            }
        });
    }
}
