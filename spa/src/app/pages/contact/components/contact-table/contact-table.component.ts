import {Component, inject, OnInit} from '@angular/core';
import {ContactProvider} from '@core/providers';
import {Contact} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableComponent} from '@core/components';
import {LucideIconsList} from '@core/lists';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-contact-table',
    imports: [
        LucideAngularModule,
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ContactTableComponent extends BaseTableComponent<Contact> implements OnInit {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public iconHeader = LucideIconsList.BookUser;
    public labelHeader = 'Liste des contacts';
    public filterFields: string[] = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'role'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'firstName',
            type:'text',
            translate: 'Prénom',
            sort: true
        },
        {
            key: 'lastName',
            type:'text',
            translate: 'Nom',
            sort: true
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
            translate: 'Téléphone'
        },
        {
            key: 'role',
            type:'text',
            translate: 'Poste'
        }
    ];

    protected fetchAll(): Observable<Contact[]> {
        return this.contactProvider.getAllNoPage();
    }

    protected deleteRequest(id: string) {
        return this.contactProvider.delete(id);
    }
}
