import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {PurchaseOrderProvider} from '@core/providers';
import {PurchaseOrder} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-purchaseOrder-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class PurchaseOrderTableComponent extends BaseTableComponent<PurchaseOrder> implements OnInit {
    private purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    public labelHeader: string = 'Liste des commandes';
    public iconHeader = LucideIconsList.Package;
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

    protected fetchAll(): Observable<PurchaseOrder[]> {
        return this.purchaseOrderProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.purchaseOrderProvider.delete(id);
    }
}
