import {Component, inject, OnInit} from '@angular/core';
import {BaseTableComponent} from '@core/components';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {SharedDetailsProvider} from '@core/providers';
import {SharedDetails} from '@core/models';
import {Pagination, TableColumn} from '@core/types';
import {DatePipe} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
    selector: 'app-sharedDetails-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        LucideAngularModule
    ],
    templateUrl: '../../../../core/layouts/table.component.html'
})
export class SharedDetailsTableComponent extends BaseTableComponent implements OnInit {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public entityName: string = 'shared-detail';
    public filterFields: string[] = [
        'fileName',
        'notes'
    ];
    public tableColumns: TableColumn[] = [
        {
            key: 'fileName',
            type:'text',
            translate: 'Nom du fichier',
            sort: true
        },
        {
            key: 'notes',
            type:'text',
            translate: 'Remarque',
            sort: true
        }
    ];

    ngOnInit(): void {
        this.setupSseConnection('shared-details');
    }

    public loadEntities(params?: {page: number}): void {
        this.loading = true;

        this.sharedDetailsProvider.getAll(params).subscribe({
            next: (response: Pagination<SharedDetails>) => {
                this.entities = response.content;
                this.totalElements = response.totalElements;
            },
            error: (error: Error) => {
                console.error('Erreur lors du chargement des pays:', error);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        })
    }

    protected override deleteEntity(sharedDetails: SharedDetails): void {
        this.sharedDetailsProvider.delete(sharedDetails.id).subscribe({
            next: () => {
                this.removeEntity(sharedDetails.id);
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
