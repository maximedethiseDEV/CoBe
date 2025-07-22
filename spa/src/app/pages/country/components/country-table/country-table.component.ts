import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CountryProvider} from '@core/providers';
import {Country} from '@core/models';
import {TableColumn} from '@core/types';
import {PaginatedResponse} from '@core/models/paginated-response.model';

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
    public entityIdentifier: string = 'id';
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
        this.loadEntities();
        this.setupSseConnection('countries');
    }

    public loadEntities(page: number = 0, size: number = this.pageSize): void {
        this.loading = true;

        this.countryProvider.getAll().subscribe({
            next: (response: PaginatedResponse<Country>) => {
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
