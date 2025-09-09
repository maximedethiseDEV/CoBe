import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TransportSupplierProvider} from '@core/providers';
import {TransportSupplier} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-transportSupplier-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class TransportSupplierTableComponent extends BaseTableComponent<TransportSupplier> implements OnInit {
    private transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    public labelHeader: string = 'Liste des transporteurs';
    public iconHeader = LucideIconsList.Truck;
    public filterFields: string[] = [
        'companyName',
        'hasParent',
        'cityName',
        'postalCode',
        'countryCode',
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'codeAS400',
            type:'text',
            translate: 'Code AS400',
            sort: true
        },
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

    protected fetchAll(): Observable<TransportSupplier[]> {
        return this.transportSupplierProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.transportSupplierProvider.delete(id);
    }
}
