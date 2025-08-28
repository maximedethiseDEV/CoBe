import {Component, inject, OnInit} from '@angular/core';
import {DbUserProvider} from '@core/providers';
import {City, DbUser} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableComponent} from '@core/components';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-db-user-table',
    imports: [
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class DbUserTableComponent extends BaseTableComponent<DbUser> implements OnInit {
    private dbUserProvider: DbUserProvider = inject(DbUserProvider);
    public labelHeader: string = 'Liste des utilisateurs';
    public iconHeader = LucideIconsList.Users;
    public filterFields: string[] = [
        'username',
        'lastName',
        'firstName',
        'email',
        'phone',
        'permission'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'username',
            type:'text',
            translate: 'Pseudo',
            sort: true
        },
        {
            key: 'lastName',
            type:'text',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'firstName',
            type:'text',
            translate: 'Prénom'
        },
        {
            key: 'email',
            type:'text',
            translate: 'Email',
            sort: true
        },
        {
            key: 'phone',
            type:'text',
            translate: 'Téléphone',
            sort: true
        },
        {
            key: 'permission',
            type:'text',
            translate: 'Accès'
        }
    ];

    protected fetchAll(): Observable<DbUser[]> {
        return this.dbUserProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.dbUserProvider.delete(id);
    }
}
