import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CityProvider, CountryProvider} from '@core/providers';
import {City, Country} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-city-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class CityTableComponent extends BaseTableComponent implements OnInit {
    private cityProvider: CityProvider = inject(CityProvider);
    public entityName: string = 'city';
    public filterFields: string[] = [
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'cityName',
            type:'text',
            translate: 'Nom',
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
