import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ContactProvider} from '@core/providers';
import {Contact} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-contact-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ContactTableComponent extends BaseTableComponent implements OnInit {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public entityName: string = 'contact';
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
            translate: 'Prénom',
            sort: true
        },
        {
            key: 'lastName',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'email',
            translate: 'Email',
            sort: true
        },
        {
            key: 'phone',
            translate: 'Téléphone'
        },
        {
            key: 'role',
            translate: 'Poste'
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('contacts');
    }

    public loadEntities(params?: {page: number}): void {
        this.loading = true;

        this.contactProvider.getAll(params).subscribe({
            next: (response: Pagination<Contact>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les données'
                });
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        })
    }

    protected override deleteEntity(contact: Contact): void {
        this.contactProvider.delete(contact.id).subscribe({
            next: () => {
                this.removeEntity(contact.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Contact supprimé',
                    life: 2000
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de supprimer les données'
                });
            }
        });
    }
}
