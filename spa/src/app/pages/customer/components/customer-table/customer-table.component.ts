import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {CustomerProvider} from '@core/providers';
import {Customer} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-customer-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CustomerTableComponent extends BaseTableComponent<Customer> implements OnInit {
    private customerProvider: CustomerProvider = inject(CustomerProvider);
    public labelHeader: string = 'Liste des clients';
    public iconHeader = LucideIconsList.Sparkles;
    public filterFields: string[] = [
        'companyName',
        'cityName',
        'postalCode',
        'countryCode',
        'isSolvent',
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
            key: 'isSolvent',
            type:'boolean',
            translate: 'Solvable',
            sort: true
        },
        {
            key: 'hasParent',
            type:'boolean',
            translate: 'Sous-traitant',
            sort: true
        }
    ];

    protected fetchAll(): Observable<Customer[]> {
        return this.customerProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.customerProvider.delete(id);
    }
}
