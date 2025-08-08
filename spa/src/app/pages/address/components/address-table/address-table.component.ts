import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {AddressProvider, CityProvider, CountryProvider} from '@core/providers';
import {Address} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {zip, map} from 'rxjs';

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
    private cityProvider: CityProvider = inject(CityProvider);
    private countryProvider: CountryProvider = inject(CountryProvider);
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

        zip(
            this.addressProvider.getAll(params),
            this.cityProvider.getAll(),
            this.countryProvider.getAll()
        ).pipe(
            map(([addressesResponse, citiesResponse, countriesResponse]) : Pagination<Address> => {
                const countryMapping = new Map(
                    countriesResponse.content.map(country => [
                        country.id,
                        country.countryCode
                    ])
                );
                const cityMapping = new Map(
                    citiesResponse.content.map(city => [
                        city.id,
                        {
                            cityName: city.cityName,
                            postalCode: city.postalCode,
                            countryCode: countryMapping.get(city.countryId)
                        }
                    ])
                );

                return {
                    ...addressesResponse,
                    content: addressesResponse.content.map(address => ({
                        ...address,
                        ...cityMapping.get(address.cityId)
                    }))
                };
            })
        ).subscribe({
            next: (response: Pagination<Address>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;
            },
            error: (error: Error) => {
                console.error('Erreur lors du chargement des données des addresses:', error);
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
