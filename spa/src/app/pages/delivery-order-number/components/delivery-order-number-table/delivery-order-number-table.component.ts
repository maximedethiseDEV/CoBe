import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {DeliveryOrderNumber} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-deliveryOrderNumber-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class DeliveryOrderNumberTableComponent extends BaseTableComponent<DeliveryOrderNumber> implements OnInit {
    private deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    public labelHeader: string = 'Liste des numéros de chargement';
    public iconHeader = LucideIconsList.Hash;
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

    protected fetchAll(): Observable<DeliveryOrderNumber[]> {
        return this.deliveryOrderNumberProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.deliveryOrderNumberProvider.delete(id);
    }
}
