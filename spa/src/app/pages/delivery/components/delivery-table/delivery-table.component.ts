import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {DeliveryProvider} from '@core/providers';
import {Delivery} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-delivery-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class DeliveryTableComponent extends BaseTableComponent implements OnInit {
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    public entityName: string = 'delivery';
    public filterFields: string[] = [
        'actualDeliveryBegin',
        'actualDeliveryEnd',
        'quantity',
        'status',
        'orderId',
        'transportSupplierId',
        'deliveryOrderNumberId',
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'actualDeliveryBegin',
            type:'text',
            translate: 'Début de livraison',
            sort: true
        },
        {
            key: 'actualDeliveryEnd',
            type:'text',
            translate: 'Fin de livraison',
            sort: true
        },
        {
            key: 'quantity',
            type:'text',
            translate: 'Quantité',
            sort: true
        },
        {
            key: 'status',
            type:'text',
            translate: 'Statut',
            sort: true
        },
        {
            key: 'orderId',
            type:'text',
            translate: 'Numéro de commande',
            sort: true
        },
        {
            key: 'transportSupplierId',
            type:'text',
            translate: 'Transporteur',
            sort: true
        },
        {
            key: 'deliveryOrderNumberId',
            type:'text',
            translate: 'Numéro de chargement',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('deliveries');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.deliveryProvider.getAll(params).subscribe({
            next: (response: Pagination<Delivery>) => {
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

    protected override deleteEntity(delivery: Delivery): void {
        this.deliveryProvider.delete(delivery.id).subscribe({
            next: () => {
                this.removeEntity(delivery.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Livraison supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression de la livraison :', error);
            }
        });
    }
}
