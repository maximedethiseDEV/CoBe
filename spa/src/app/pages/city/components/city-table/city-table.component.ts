import {Component, inject, OnInit} from '@angular/core';
import {CityProvider} from '@core/providers';
import {City} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableComponent} from '@core/components';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-city-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CityTableComponent extends BaseTableComponent<City> implements OnInit {
    private cityProvider: CityProvider = inject(CityProvider);
    public labelHeader: string = 'Liste des villes';
    public iconHeader = LucideIconsList.Building2;
    public filterFields: string[] = [
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'cityName',
            type:'text',
            translate: 'Nom',
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
        }
    ];

    protected fetchAll(): Observable<City[]> {
        return this.cityProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.cityProvider.delete(id);
    }
}
