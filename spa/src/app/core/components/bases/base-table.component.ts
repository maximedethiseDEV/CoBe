import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {SubscriptionCollection} from '@core/classes';
import {SseService} from '@core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {LucideIconsList} from '@core/lists';
import {LucideIconData} from 'lucide-angular';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
    template: ''
})
export abstract class BaseTableComponent<T extends EntityModel = EntityModel> implements OnInit, OnDestroy {
    messageService: MessageService = inject(MessageService);
    public readonly createIcon: any = LucideIconsList.Plus;
    public readonly refreshIcon: any = LucideIconsList.RefreshCcw;
    public readonly filterIcon: any = LucideIconsList.ChevronsUpDown;
    public readonly updateIcon: any = LucideIconsList.SquarePen;
    public readonly deleteIcon: any = LucideIconsList.Trash2;
    public readonly nextPageIcon: any = LucideIconsList.ChevronRight;
    public readonly previousPageIcon: any = LucideIconsList.ChevronLeft;
    public readonly emptyDataIcon: any = LucideIconsList.Inbox;

    abstract labelHeader: string;
    abstract iconHeader:LucideIconData;
    abstract filterFields: string[];
    abstract tableColumns: TableColumn[];

    // Optionnel: canal SSE et auto-load pour centraliser l'init
    public sseChannel?: string;
    public autoLoad: boolean = true;

    protected subscriptionCollection: SubscriptionCollection = new SubscriptionCollection();
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected sseService: SseService = inject(SseService);
    protected entities: T[] = [];
    public totalElements: number = 0;
    public currentPage: number = 1;
    public loading: boolean = true;
    protected tableActions: string[] = ['create', 'update', 'delete', 'send'];

    protected itemsPerPage: number = 100;
    protected searchTerm: string = '';

    constructor() {}

    ngOnInit(): void {
        if (this.sseChannel) {
            this.setupSseConnection(this.sseChannel);
        }
        if (this.autoLoad) {
            this.loadEntities();
        }
    }

    ngOnDestroy(): void {
        this.subscriptionCollection.unsubscribe();
    }

    get filteredData(): T[] {
        if (!this.searchTerm) {
            return this.entities;
        }

        return this.entities.filter(entity => {
            return this.filterFields.some(field => {
                const value = this.getNestedValue(entity, field);
                return value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        });
    }

    get paginatedData(): T[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredData.slice(startIndex, endIndex);
    }

    get totalPages(): number {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
    }

    get startIndex(): number {
        return (this.currentPage - 1) * this.itemsPerPage;
    }

    get endIndex(): number {
        return Math.min(this.startIndex + this.itemsPerPage, this.filteredData.length);
    }

    // Méthodes publiques
    public hasTableAction(action: 'create' | 'update' | 'delete' | 'send'): boolean {
        return this.tableActions.includes(action);
    }

    public hasAnyAction(): boolean {
        return this.tableActions.some(action => ['update', 'delete'].includes(action));
    }

    public getColumnValue(entity: T, column: TableColumn): string {
        const value = this.getNestedValue(entity, column.key);

        // Tu peux ajouter ici des formatters selon le type de colonne
        if (column.type === 'date' && value) {
            return new Date(value).toLocaleDateString('fr-FR');
        }

        return value?.toString() || '';
    }


    public onSearch(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.searchTerm = target.value;
        this.currentPage = 1; // Reset à la première page lors de la recherche
    }

    public goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.onPageChange({
                first: (page - 1) * this.itemsPerPage,
                rows: this.itemsPerPage
            });
        }
    }

    public getVisiblePages(): number[] {
        const totalPages = this.totalPages;
        const current = this.currentPage; // garde-fou
        const visible: number[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) visible.push(i);
        } else if (current <= 4) {
            for (let i = 1; i <= 5; i++) visible.push(i);
            visible.push(totalPages);
        } else if (current >= totalPages - 3) {
            visible.push(1);
            for (let i = totalPages - 4; i <= totalPages; i++) visible.push(i);
        } else {
            visible.push(1);
            for (let i = current - 1; i <= current + 1; i++) visible.push(i);
            visible.push(totalPages);
        }

        return visible;
    }

    public refreshData(): void {
        this.loadEntities({ page: this.currentPage - 1 });
    }

    // API de données à implémenter dans les enfants
    protected abstract fetchAll(params?: any): Observable<T[]>;
    protected abstract deleteRequest(id: string): Observable<any>;

    // Implémentation générique de chargement/suppression
    public loadEntities(params?: any): void {
        this.loading = true;
        this.fetchAll(params).subscribe({
            next: (data: T[]) => {
                this.entities = data;
                this.totalElements = data.length;
            },
            error: (error: Error) => {
                console.error('Erreur lors du chargement des données:', error);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    public createEntity(): void {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    public updateEntity(entity: T): void {
        this.router.navigate(['update', (entity as EntityModel).id], { relativeTo: this.route });
    }

    public deleteEntity(entity: T): void {
        const id = (entity as EntityModel).id;
        this.deleteRequest(id).subscribe({
            next: () => {
                this.removeEntity(id);
                this.totalElements = this.entities.length;
            },
            error: (error: Error) => {
                console.error('Impossible de supprimer les données :', error);
            }
        });
    }

    protected onPageChange(event: any): void {
        const pageIndex: number = event.first / event.rows;
        this.currentPage = pageIndex + 1;
        this.loadEntities({ page: this.currentPage - 1 });
    }

    protected removeEntity(entityId: string): void {
        // @ts-ignore
        const index: number = this.entities.findIndex((entity: T) => (entity as EntityModel).id === entityId);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    protected setupSseConnection(entityName: string): void {
        this.subscriptionCollection.subscribe = this.sseService.getServerSentEvents(entityName).subscribe({
            next: (event: any) => {
                if (event.eventType === 'CREATE') {
                    this.entities = [...this.entities, event.payload];
                    this.totalElements = this.entities.length;
                } else if (event.eventType === 'UPDATE') {
                    // @ts-ignore
                    this.entities = this.entities.map((entity: T) =>
                        (entity as EntityModel).id === event.payload.id ? event.payload : entity
                    );
                } else if (event.eventType === 'DELETE') {
                    // @ts-ignore
                    const index: number = this.entities.findIndex((entity: T) =>
                        (entity as EntityModel).id === event.payload
                    );

                    if (index > -1) {
                        this.entities.splice(index, 1);
                        this.totalElements = this.entities.length;
                    }
                }
            },
            error: (error: Error) => {
                console.error('Erreur SSE:', error);
            }
        });
    }

    // Méthodes utilitaires
    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
}
