import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CityProvider, CountryProvider} from '@core/providers';
import {City, Country} from '@core/models';
import {Pagination, TableColumn} from '@core/types';

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
    private countries: Country[] = [];
    public entityName: string = 'city';
    public filterFields: string[] = [
        'cityName',
        'postalCode',
        'countryName'
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
        },
        {
            key: 'countryName',
            translate: 'Pays'
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('cities');
    }

    public loadEntities(params?: {page: number}): void {
        this.loading = true;

        this.cityProvider.getAll(params).subscribe({
            next: (response: Pagination<City>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;

                this.loadCountries();
            },
            error: (error: Error) => {
                console.error('Erreur lors du chargement des contacts:', error);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        })
    }

    private loadCountries(): void {
        this.countryProvider.getAll().subscribe({
            next: (response: Pagination<Country>) => {
                this.countries = response.content;

                for (const city of this.entities as City[]) {
                    const country: Country|undefined = this.countries.find((country: Country) => country.id === city.countryId);
                    city.countryName = country?.countryName || '';
                }
            },
            error: (error: Error) => {},
            complete: () => {}
        });
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
