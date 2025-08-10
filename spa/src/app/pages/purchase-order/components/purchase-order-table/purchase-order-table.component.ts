import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {PurchaseOrderProvider} from '@core/providers';
import {PurchaseOrder} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-purchaseOrder-table',
    imports: [
        TableModule,
        Button
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
        'billingCustomerName',
        'deliveryCustomerName',
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
            key: 'billingCustomerName',
            translate: 'Donneur d\'ordre',
            sort: true
        },
        {
            key: 'deliveryCustomerName',
            translate: 'Client à livrer',
            sort: true
        },
        {
            key: 'constructionSiteCustomerName',
            translate: 'Chantier nom entreprise',
            sort: true
        },
        {
            key: 'constructionSiteStreet',
            translate: 'Chantier rue',
            sort: true
        },
        {
            key: 'constructionSiteCityName',
            translate: 'Chantier ville',
            sort: true
        },
        {
            key: 'constructionSitePostalCode',
            translate: 'Chantier CP',
            sort: true
        },
        {
            key: 'constructionSiteCountryCode',
            translate: 'Chantier pays',
            sort: true
        },
        {
            key: 'code',
            translate: 'Code produit',
            sort: true
        },
        {
            key: 'name',
            translate: 'Produit',
            sort: true
        },
        {
            key: 'materialSupplierName',
            translate: 'Fournisseur',
            sort: true
        },
        {
            key: 'quantityOrdered',
            translate: 'quantité',
            sort: true
        },
        {
            key: 'requestedDeliveryBegin',
            translate: 'Début livraison',
            sort: true
        },
        {
            key: 'requestedDeliveryEnd',
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
