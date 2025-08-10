import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CustomerProvider} from '@core/providers';
import {Customer} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-customer-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CustomerTableComponent extends BaseTableComponent implements OnInit {
    private customerProvider: CustomerProvider = inject(CustomerProvider);
    public entityName: string = 'customer';
    public filterFields: string[] = [
        'companyName',
        'cityName',
        'postalCode',
        'countryCode',
        'isSolvent',
        'hasParent'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'companyName',
            translate: 'Nom',
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
        },
        {
            key: 'isSolvent',
            translate: 'Solvable',
            sort: true
        },
        {
            key: 'hasParent',
            translate: 'Sous-traitant',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('companies');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.customerProvider.getAll(params).subscribe({
            next: (response: Pagination<Customer>) => {
                this.entities = response.content.map(customer => ({
                    ...customer,
                    hasParent: !!customer.parentId
                }));
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

    protected override deleteEntity(customer: Customer): void {
        this.customerProvider.delete(customer.id).subscribe({
            next: () => {
                this.removeEntity(customer.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Client supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du client :', error);
            }
        });
    }
}
