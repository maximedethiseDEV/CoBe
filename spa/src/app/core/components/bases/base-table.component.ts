import {Component, OnDestroy, ViewChild, inject} from '@angular/core';
import {Table} from 'primeng/table';
import {MessageService} from 'primeng/api';
import {EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {SubscriptionCollection} from '@core/classes';
import {SseService} from '@core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {LucideIconsList} from '@core/lists';

@Component({
    template: ''
})
export abstract class BaseTableComponent implements OnDestroy {
    @ViewChild('dt') dt!: Table;
    abstract entityName: string;
    abstract filterFields: string[];
    abstract tableColumns: TableColumn[];
    protected subscriptionCollection: SubscriptionCollection = new SubscriptionCollection();
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected sseService: SseService = inject(SseService);
    protected messageService: MessageService = inject(MessageService);
    public readonly iconsList: any = LucideIconsList;
    protected entities: EntityModel[] = [];
    protected totalElements: number = 0;
    protected currentPage: number = 1;
    protected loading: boolean = true;
    protected tableStyle: {
        width: string,
        height: string
    } = {
        width: '100%',
        height: '100%'
    };
    protected tableActions: string[] = [
        'create',
        'update',
        'delete'
    ];

    constructor() {}

    ngOnDestroy(): void {
        this.subscriptionCollection.unsubscribe();
    }

    get tableData(): EntityModel[] {
        return this.entities;
    }

    public hasTableAction(action: 'create'|'update'|'delete'): boolean {
        return this.tableActions.includes(action);
    }

    abstract loadEntities(params?: {page: number}): void;

    protected createEntity(): void {
        this.router.navigate(['create'], {relativeTo: this.route});
    }

    protected updateEntity(entity: EntityModel): void {
        // @ts-ignore
        this.router.navigate(['update', entity.id], {relativeTo: this.route});
    }

    protected deleteEntity(entity: EntityModel): void {}

    protected removeEntity(entityId: string): void {
        // @ts-ignore
        const index: number = this.entities.findIndex((entity: EntityModel) => entity.id === entityId);

        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    protected clear(): void {
        this.dt.clear();
    }

    protected search(event: Event): void {
        const inputValue: string = (event.target as HTMLInputElement)?.value || '';
        this.dt.filterGlobal(inputValue, 'contains');
    }

    protected onPageChange(event: any): void {
        const pageIndex: number = event.first / event.rows;
        this.currentPage = pageIndex + 1;

        this.loadEntities({page: this.currentPage - 1});
    }

    protected setupSseConnection(entityName: string): void {
        this.subscriptionCollection.subscribe = this.sseService.getServerSentEvents(entityName).subscribe({
            next: (event: any) => {
                if (event.eventType === 'CREATE') {
                    this.entities = [...this.entities, event.payload];
                } else if (event.eventType === 'UPDATE') {
                    // @ts-ignore
                    this.entities = this.entities.map((entity: EntityModel) => entity.id === event.payload.id ? event.payload : entity);
                } else if (event.eventType === 'DELETE') {
                    // @ts-ignore
                    const index: number = this.entities.findIndex((entity: EntityModel) => entity.id === event.payload);

                    if (index > -1) {
                        this.entities.splice(index, 1);
                    }
                }
            },
            error: (error: Error) => {
                console.error('Erreur SSE:', error);
            }
        });
    }
}
