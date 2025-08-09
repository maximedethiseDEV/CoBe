import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {AddressProvider} from '@core/providers';
import {Address} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-address-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class AddressTableComponent extends BaseTableComponent implements OnInit {
    private addressProvider: AddressProvider = inject(AddressProvider);
    public entityName: string = 'address';
    public filterFields: string[] = [
        'street',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'street',
            translate: 'Rue',
            sort: true
        },
        {
            key: 'cityName',
            translate: 'Ville',
            sort: true
        },
        {
            key: 'postalCode',
            translate: 'Code postal',
            sort: true
        },
        {
            key: 'countryCode',
            translate: 'Pays',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('addresses');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.addressProvider.getAll(params).subscribe({
            next: (response: Pagination<Address>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;
            },
            error: (error: Error) => {
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
        });
    }

    protected override deleteEntity(address: Address): void {
        this.addressProvider.delete(address.id).subscribe({
            next: () => {
                this.removeEntity(address.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Adresse supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression de l\'adresse :', error);
            }
        });
    }
}
