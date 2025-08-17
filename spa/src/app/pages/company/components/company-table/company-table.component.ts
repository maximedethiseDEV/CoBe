import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CompanyProvider} from '@core/providers';
import {Company} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-company-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CompanyTableComponent extends BaseTableComponent implements OnInit {
    private companyProvider: CompanyProvider = inject(CompanyProvider);
    public entityName: string = 'company';
    public filterFields: string[] = [
        'companyName',
        'cityName',
        'postalCode',
        'countryCode',
        'hasParent',
        'commerciallyActive'
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
            key: 'hasParent',
            type:'boolean',
            translate: 'Sous-traitant',
            sort: true,
        },
        {
            key: 'commerciallyActive',
            type: 'boolean',
            translate: 'Actif',
            sort: true,
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('companies');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.companyProvider.getAll(params).subscribe({
            next: (response: Pagination<Company>) => {
                this.entities = response.content.map(company => ({
                    ...company,
                    hasParent: !!company.parentId
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

    protected override deleteEntity(company: Company): void {
        this.companyProvider.delete(company.id).subscribe({
            next: () => {
                this.removeEntity(company.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Entreprise supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression de l\'entreprise :', error);
            }
        });
    }
}
