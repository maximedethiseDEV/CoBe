import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ContactProvider} from '@core/providers';
import {City, Contact} from '@core/models';
import {TableColumn} from '@core/types';
import {PaginatedResponse} from '@core/models/paginated-response.model';

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
    public entityIdentifier: string = 'id';
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
        this.loadEntities();
        this.setupSseConnection('contacts');
    }

    public loadEntities(page: number = 0, size: number = this.pageSize): void {
        this.loading = true;

        this.contactProvider.getAll().subscribe({
            next: (response: PaginatedResponse<Contact>) => {
                this.entities = response.content;
                this.totalRecords = response.totalElements;
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les données'
                });
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
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du contact :', error);
            }
        });
    }
}
