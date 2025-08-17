import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CustomerProvider} from '@core/providers';
import {Customer} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-customer-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
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
            key: 'isSolvent',
            type:'boolean',
            translate: 'Solvable',
            sort: true
        },
        {
            key: 'hasParent',
            type:'boolean',
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
