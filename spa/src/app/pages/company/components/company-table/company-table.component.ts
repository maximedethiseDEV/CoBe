import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {CompanyProvider} from '@core/providers';
import {Company} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-company-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CompanyTableComponent extends BaseTableComponent<Company> implements OnInit {
    private companyProvider: CompanyProvider = inject(CompanyProvider);
    public labelHeader: string = 'Liste des entreprises';
    public iconHeader = LucideIconsList.Wallet;
    public filterFields: string[] = [
        'companyName',
        'cityName',
        'postalCode',
        'countryCode',
        'hasParent',
        'commerciallyActive'
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
            key: 'hasParent',
            type:'boolean',
            translate: 'Sous-traitant',
            sort: true,
        },
        {
            key: 'commerciallyActive',
            type: 'boolean',
            translate: 'Actif',
            sort: true,
        }
    ];

    protected fetchAll(): Observable<Company[]> {
        return this.companyProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.companyProvider.delete(id);
    }
}
