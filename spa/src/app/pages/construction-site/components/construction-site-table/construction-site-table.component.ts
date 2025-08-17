import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ConstructionSiteProvider} from '@core/providers';
import {ConstructionSite} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-constructionSite-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class ConstructionSiteTableComponent extends BaseTableComponent implements OnInit {
    private constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    public entityName: string = 'construction-sites';
    public filterFields: string[] = [
        'companyName',
        'street',
        'cityName',
        'postalCode',
        'countryCode'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'companyName',
            type:'text',
            translate: 'Nom',
            sort: true,
        },
        {
            key: 'street',
            type:'text',
            translate: 'Rue',
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
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('construction-sites');
    }

    public loadEntities(params?: any) {
        this.loading = true;

        this.constructionSiteProvider.getAll(params).subscribe({
            next: (response: Pagination<ConstructionSite>) => {
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

    protected override deleteEntity(constructionSite: ConstructionSite): void {
        this.constructionSiteProvider.delete(constructionSite.id).subscribe({
            next: () => {
                this.removeEntity(constructionSite.id);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Supprimé',
                    detail: 'Chantier supprimée',
                    life: 2000
                });
            },
            error: (error: Error) => {
                console.error('Erreur lors de la suppression du chantier :', error);
            }
        });
    }
}
