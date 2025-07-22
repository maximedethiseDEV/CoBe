import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CityProvider, CountryProvider} from '@core/providers';
import {City, Country} from '@core/models';
import {TableColumn} from '@core/types';
import {PaginatedResponse} from "@core/models/paginated-response.model";

@Component({
    selector: 'app-city-table',
    imports: [
        TableModule,
        Button
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CityTableComponent extends BaseTableComponent implements OnInit {
    private cityProvider: CityProvider = inject(CityProvider);
    private countryProvider: CountryProvider = inject(CountryProvider);
    public entityIdentifier: string = 'id';
    public entityName: string = 'city';
    public filterFields: string[] = [
        'cityName',
        'postalCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'cityName',
            translate: 'Nom',
            sort: true
        },
        {
            key: 'postalCode',
            translate: 'Code postal',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.loadEntities();
        this.setupSseConnection('cities');
    }

    private loadCountries(page: number = 0, size: number = this.pageSize): void {
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
            },
            complete: () => {}
        });
    }

    public loadEntities(page: number = 0, size: number = this.pageSize): void {
        this.loading = true;

        this.cityProvider.getAll().subscribe({
            next: (response: PaginatedResponse<City>) => {
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

    protected override deleteEntity(city: City): void {
        this.cityProvider.delete(city.id).subscribe({
            next: () => {
                this.removeEntity(city.id);
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
