import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {SharedDetailsProvider} from '@core/providers';
import {SharedDetails} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-sharedDetails-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class SharedDetailsTableComponent extends BaseTableComponent<SharedDetails> implements OnInit {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public labelHeader: string = 'Liste des détails';
    public iconHeader = LucideIconsList.PackageSearch;
    public filterFields: string[] = [
        'label',
        'fileName',
        'notes'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'label',
            type:'text',
            translate: 'Etiquette',
            sort: true
        },
        {
            key: 'fileName',
            type:'text',
            translate: 'Nom du fichier',
            sort: true
        },
        {
            key: 'notes',
            type:'text',
            translate: 'Remarque',
            sort: true
        }
    ];

    protected fetchAll(): Observable<SharedDetails[]> {
        return this.sharedDetailsProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.sharedDetailsProvider.delete(id);
    }
}
