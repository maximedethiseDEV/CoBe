import {Component, inject, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ContactProvider} from '@core/providers';
import {Contact, EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {LucideAngularModule} from 'lucide-angular';
import {BaseTableVanillaComponent} from '@core/components/bases/base-table-vanilla.component';
import {LucideIconsList} from '@core/lists';

@Component({
    selector: 'app-contact-table',
    imports: [
        TableModule,
        LucideAngularModule,
        LucideAngularModule,
    ],
    templateUrl: '../../../../core/layouts/table-vanilla.component.html'
})
export class ContactTableComponent extends BaseTableVanillaComponent implements OnInit {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public iconHeader = LucideIconsList.CircleUserRound;
    public entityName: string = 'contact';
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

    ngOnInit(): void {
        this.setupSseConnection('contacts');
        this.loadEntities();
    }

    public loadEntities(): void {
        this.loading = true;

        this.contactProvider.getAllNoPage().subscribe({
            next: (contacts: Contact[]) => {
                this.entities = contacts;
                this.totalElements = contacts.length;
            },
            error: (error: Error) => {
                console.error('Erreur lors du chargement des données:', error);
            },
            complete: () => {
                this.loading = false;
            }
        })
    }

    public deleteEntity(entity: EntityModel): void {
        const contact = entity as Contact;
        this.contactProvider.delete(contact.id).subscribe({
            next: () => {
                this.removeEntity(contact.id);
                this.totalElements = this.entities.length;
            },
            error: (error: Error) => {
                console.log("Impossible de supprimer les données :", error);
            }
        });
    }
}
