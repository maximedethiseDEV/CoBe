import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {DeliveryOrderNumber} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-deliveryOrderNumber-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
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
            type:'text',
            translate: 'Numéro',
            sort: true
        },
        {
            key: 'transportSupplierName',
            type:'text',
            translate: 'Transporteur',
            sort: true
        },
        {
            key: 'customerName',
            type:'text',
            translate: 'Client',
            sort: true
        },
        {
            key: 'cityName',
            type:'text',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'code',
            type:'text',
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
