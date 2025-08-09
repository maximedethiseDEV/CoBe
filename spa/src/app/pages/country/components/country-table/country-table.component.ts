import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CountryProvider} from '@core/providers';
import {Country} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

@Component({
    selector: 'app-country-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CountryTableComponent extends BaseTableComponent implements OnInit {
    private countryProvider: CountryProvider = inject(CountryProvider);
    public entityName: string = 'country';
    public filterFields: string[] = [
        'countryName',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'countryName',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'countryCode',
            translate: 'Code',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('countries');
    }

    public loadEntities(params?: {page: number}): void {
        this.loading = true;

        this.countryProvider.getAll(params).subscribe({
            next: (response: Pagination<Country>) => {
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

    protected override deleteEntity(country: Country): void {
        this.countryProvider.delete(country.id).subscribe({
            next: () => {
                this.removeEntity(country.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Pays supprimé',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du pays :', error);
            }
        });
    }
}
