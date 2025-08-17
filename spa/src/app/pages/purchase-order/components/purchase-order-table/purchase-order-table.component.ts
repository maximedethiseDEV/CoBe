import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {PurchaseOrderProvider} from '@core/providers';
import {PurchaseOrder} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-purchaseOrder-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class PurchaseOrderTableComponent extends BaseTableComponent implements OnInit {
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    public entityName: string = 'purchase-orders';
    public filterFields: string[] = [
        'requestedDeliveryBegin',
        'requestedDeliveryEnd',
        'quantityOrdered',
        'customerName',
        'constructionSiteCustomerName',
        'constructionSiteStreet',
        'constructionSiteCityName',
        'constructionSitePostalCode',
        'constructionSiteCountryCode',
        'code',
        'name',
        'materialSupplierName'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'customerName',
            type:'text',
            translate: 'Client à livrer',
            sort: true
        },
        {
            key: 'constructionSiteCustomerName',
            type:'text',
            translate: 'Chantier nom entreprise',
            sort: true
        },
        {
            key: 'constructionSiteStreet',
            type:'text',
            translate: 'Chantier rue',
            sort: true
        },
        {
            key: 'constructionSiteCityName',
            type:'text',
            translate: 'Chantier ville',
            sort: true
        },
        {
            key: 'constructionSitePostalCode',
            type:'text',
            translate: 'Chantier CP',
            sort: true
        },
        {
            key: 'constructionSiteCountryCode',
            type:'text',
            translate: 'Chantier pays',
            sort: true
        },
        {
            key: 'code',
            type:'text',
            translate: 'Code produit',
            sort: true
        },
        {
            key: 'name',
            type:'text',
            translate: 'Produit',
            sort: true
        },
        {
            key: 'materialSupplierName',
            type:'text',
            translate: 'Fournisseur',
            sort: true
        },
        {
            key: 'quantityOrdered',
            type:'text',
            translate: 'Quantité',
            sort: true
        },
        {
            key: 'requestedDeliveryBegin',
            type: 'date',
            translate: 'Début livraison',
            sort: true
        },
        {
            key: 'requestedDeliveryEnd',
            type: 'date',
            translate: 'Fin livraison',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('purchase-orders');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.purchaseOrderProvider.getAll(params).subscribe({
            next: (response: Pagination<PurchaseOrder>) => {
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

    protected override deleteEntity(purchaseOrder: PurchaseOrder): void {
        this.purchaseOrderProvider.delete(purchaseOrder.id).subscribe({
            next: () => {
                this.removeEntity(purchaseOrder.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Commande supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression de la commande :', error);
            }
        });
    }
}
