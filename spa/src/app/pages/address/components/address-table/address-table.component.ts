import {Component, inject, OnInit} from '@angular/core';
import {AddressProvider} from '@core/providers';
import {Address} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableComponent} from '@core/components';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-address-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class AddressTableComponent extends BaseTableComponent<Address> implements OnInit {
    private addressProvider: AddressProvider = inject(AddressProvider);
    public labelHeader: string = 'Liste des adresses';
    public iconHeader = LucideIconsList.MapPin;
    public filterFields: string[] = [
        'street',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'street',
            type: 'text',
            translate: 'Rue',
            sort: true
        },
        {
            key: 'cityName',
            type: 'text',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'postalCode',
            type: 'text',
            translate: 'Code postal',
            sort: true
        },
        {
            key: 'countryCode',
            type: 'text',
            translate: 'Pays',
            sort: true
        }
    ];

    protected fetchAll(): Observable<Address[]> {
        return this.addressProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.addressProvider.delete(id);
    }
}
