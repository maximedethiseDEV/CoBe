import {Component, OnDestroy, inject} from '@angular/core';
import {EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {SubscriptionCollection} from '@core/classes';
import {SseService} from '@core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {LucideIconsList} from '@core/lists';
import {LucideIconData} from 'lucide-angular';

@Component({
    template: ''
})
export abstract class BaseTableVanillaComponent implements OnDestroy {
    public readonly createIcon: LucideIconData = LucideIconsList.CirclePlus;
    public readonly refreshIcon: LucideIconData = LucideIconsList.RefreshCcw;
    public readonly filterIcon: LucideIconData = LucideIconsList.ChevronsUpDown;
    public readonly updateIcon: LucideIconData = LucideIconsList.SquarePen;
    public readonly deleteIcon: LucideIconData = LucideIconsList.Trash2;
    public readonly nextPageIcon: LucideIconData = LucideIconsList.ChevronRight;
    public readonly previousPageIcon: LucideIconData = LucideIconsList.ChevronLeft;
    public readonly emptyDataIcon: LucideIconData = LucideIconsList.Inbox;

    abstract entityName: string;
    abstract labelHeader: string;
    abstract iconHeader: LucideIconData;
    abstract filterFields: string[];
    abstract tableColumns: TableColumn[];

    protected subscriptionCollection: SubscriptionCollection = new SubscriptionCollection();
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    protected sseService: SseService = inject(SseService);
    protected entities: EntityModel[] = [];
    protected totalElements: number = 0;
    protected currentPage: number = 1;
    protected loading: boolean = true;
    protected tableActions: string[] = ['create', 'update', 'delete'];

    protected itemsPerPage: number = 100;
    protected searchTerm: string = '';

    constructor() {}

    ngOnDestroy(): void {
        this.subscriptionCollection.unsubscribe();
    }

    // Getters
    get tableData(): EntityModel[] {
        return this.entities;
    }

    get filteredData(): EntityModel[] {
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

    get paginatedData(): EntityModel[] {
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
    public hasTableAction(action: 'create' | 'update' | 'delete'): boolean {
        return this.tableActions.includes(action);
    }

    public hasAnyAction(): boolean {
        return this.tableActions.some(action => ['update', 'delete'].includes(action));
    }

    public trackByEntity(index: number, entity: EntityModel): any {
        return entity.id || index;
    }

    public getColumnValue(entity: EntityModel, column: TableColumn): string {
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
            // Trigger onPageChange for compatibility with original component
            this.onPageChange({
                first: (page - 1) * this.itemsPerPage,
                rows: this.itemsPerPage
            });
        }
    }

    public getVisiblePages(): number[] {
        const totalPages = this.totalPages;
        const current = this.currentPage;
        const visible: number[] = [];

        if (totalPages <= 7) {
            // Afficher toutes les pages si il y en a 7 ou moins
            for (let i = 1; i <= totalPages; i++) {
                visible.push(i);
            }
        } else {
            // Logique pour afficher un nombre limité de pages
            if (current <= 4) {
                for (let i = 1; i <= 5; i++) visible.push(i);
                visible.push(-1); // Ellipsis
                visible.push(totalPages);
            } else if (current >= totalPages - 3) {
                visible.push(1);
                visible.push(-1); // Ellipsis
                for (let i = totalPages - 4; i <= totalPages; i++) visible.push(i);
            } else {
                visible.push(1);
                visible.push(-1); // Ellipsis
                for (let i = current - 1; i <= current + 1; i++) visible.push(i);
                visible.push(-1); // Ellipsis
                visible.push(totalPages);
            }
        }

        return visible.filter(page => page !== -1); // Remove ellipsis for now
    }

    public refreshData(): void {
        this.loadEntities({ page: this.currentPage - 1 });
    }

    // Méthodes abstraites
    abstract loadEntities(params?: { page: number }): void;

    protected createEntity(): void {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    protected updateEntity(entity: EntityModel): void {
        this.router.navigate(['update', entity.id], { relativeTo: this.route });
    }

    abstract deleteEntity(entity: EntityModel): void

    protected onPageChange(event: any): void {
        const pageIndex: number = event.first / event.rows;
        this.currentPage = pageIndex + 1;

        this.loadEntities({ page: this.currentPage - 1 });
    }

    protected removeEntity(entityId: string): void {
        // @ts-ignore
        const index: number = this.entities.findIndex((entity: EntityModel) => entity.id === entityId);

        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    protected setupSseConnection(entityName: string): void {
        this.subscriptionCollection.subscribe = this.sseService.getServerSentEvents(entityName).subscribe({
            next: (event: any) => {
                if (event.eventType === 'CREATE') {
                    this.entities = [...this.entities, event.payload];
                } else if (event.eventType === 'UPDATE') {
                    // @ts-ignore
                    this.entities = this.entities.map((entity: EntityModel) =>
                        entity.id === event.payload.id ? event.payload : entity
                    );
                } else if (event.eventType === 'DELETE') {
                    // @ts-ignore
                    const index: number = this.entities.findIndex((entity: EntityModel) =>
                        entity.id === event.payload
                    );

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

    // Méthodes utilitaires
    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    public search(event: Event): void {
        // Délègue à la méthode existante si elle est définie dans la base
        if (typeof (this as any).onSearch === 'function') {
            (this as any).onSearch(event);
        }
    }

}
