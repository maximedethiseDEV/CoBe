import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {ConstructionSiteProvider} from '@core/providers';
import {ConstructionSite} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-construction-site-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ConstructionSiteTableComponent extends BaseTableComponent<ConstructionSite> implements OnInit {
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public labelHeader: string = 'Liste des chantiers';
    public iconHeader = LucideIconsList.TrafficCone;
    public filterFields: string[] = [
        'companyName',
        'street',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'companyName',
            type:'text',
            translate: 'Nom',
            sort: true,
        },
        {
            key: 'street',
            type:'text',
            translate: 'Rue',
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
        }
    ];

    protected fetchAll(): Observable<ConstructionSite[]> {
        return this.constructionSiteProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.constructionSiteProvider.delete(id);
    }
}
