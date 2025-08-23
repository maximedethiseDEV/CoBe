import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {CountryProvider} from '@core/providers';
import {Country} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-country-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CountryTableComponent extends BaseTableComponent<Country> implements OnInit {
    private countryProvider: CountryProvider = inject(CountryProvider);
    public labelHeader: string = 'Liste des pays';
    public iconHeader = LucideIconsList.Earth;
    public filterFields: string[] = [
        'countryName',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'countryName',
            type:'text',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'countryCode',
            type:'text',
            translate: 'Code',
            sort: true
        }
    ];

    protected fetchAll(): Observable<Country[]> {
        return this.countryProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.countryProvider.delete(id);
    }
}
