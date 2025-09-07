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

    // Pagination
    protected itemsPerPage: number = 100;

    // Filtres par colonne (clé de colonne -> valeur de filtre)
    public filters: Record<string, any> = {};

    // Tri
    public sortKey?: string;
    public sortDir: 'asc' | 'desc' | null = null;

    // Sélection d'une seule ligne
    public selectedEntity: T | null = null;

    // Ancien champ de recherche global (non utilisé mais conservé pour compat)
    protected searchTerm: string = '';

    constructor() {}

    ngOnInit(): void {
        // Initialiser les filtres pour chaque colonne
        this.tableColumns?.forEach(col => {
            if (!(col.key in this.filters)) {
                this.filters[col.key] = '';
            }
        });
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

    // Applique les filtres par colonne
    get filteredData(): T[] {
        const activeFilters = Object.entries(this.filters).filter(([_, v]) => v !== '' && v !== null && v !== undefined);
        if (activeFilters.length === 0) {
            return this.entities;
        }

        return this.entities.filter((entity: T) => {
            return activeFilters.every(([key, rawVal]) => {
                const column = this.tableColumns.find(c => c.key === key);
                const value = this.getNestedValue(entity, key);
                if (!column) return true;
                if (rawVal === '' || rawVal === null || rawVal === undefined) return true;

                switch (column.type) {
                    case 'text':
                    case 'uuid': {
                        const valStr = (value ?? '').toString().toLowerCase();
                        return valStr.includes((rawVal ?? '').toString().toLowerCase());
                    }
                    case 'number': {
                        if (rawVal === '') return true;
                        const n = Number(rawVal);
                        if (isNaN(n)) return true;
                        return Number(value) === n;
                    }
                    case 'date': {
                        if (!rawVal) return true;
                        try {
                            const filterDate = new Date(rawVal);
                            const cellDate = value ? new Date(value) : null;
                            if (!cellDate) return false;
                            return cellDate.toDateString() === filterDate.toDateString();
                        } catch {
                            return true;
                        }
                    }
                    case 'boolean': {
                        if (rawVal === '') return true;
                        const boolVal = rawVal === true || rawVal === 'true';
                        return (!!value) === boolVal;
                    }
                    default:
                        return (value ?? '').toString().toLowerCase().includes((rawVal ?? '').toString().toLowerCase());
                }
            });
        });
    }

    // Trie les données filtrées si nécessaire
    get sortedData(): T[] {
        if (!this.sortKey || !this.sortDir) return [...this.filteredData];
        const key = this.sortKey;
        const dir = this.sortDir === 'asc' ? 1 : -1;
        const column = this.tableColumns.find(c => c.key === key);
        return [...this.filteredData].sort((a: T, b: T) => {
            const va = this.getNestedValue(a, key);
            const vb = this.getNestedValue(b, key);
            let comp = 0;
            switch (column?.type) {
                case 'number':
                    comp = (Number(va) || 0) - (Number(vb) || 0);
                    break;
                case 'date':
                    comp = (va ? new Date(va).getTime() : 0) - (vb ? new Date(vb).getTime() : 0);
                    break;
                case 'boolean':
                    comp = (va ? 1 : 0) - (vb ? 1 : 0);
                    break;
                default: {
                    const sa = (va ?? '').toString().toLowerCase();
                    const sb = (vb ?? '').toString().toLowerCase();
                    comp = sa.localeCompare(sb);
                }
            }
            return comp * dir;
        });
    }

    get paginatedData(): T[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.sortedData.slice(startIndex, endIndex);
    }

    get totalPages(): number {
        return Math.ceil(this.sortedData.length / this.itemsPerPage);
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

        switch (column.type) {
            case 'date':
                return value ? new Date(value).toLocaleDateString('fr-FR') : '';
            case 'boolean': {
                const isTrue = !!value;
                // Icône Lucide (check) si vrai, sinon vide
                return isTrue
                    ? '<span title="Oui" class="inline-flex items-center text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>'
                    : '';
            }
            case 'text':
                return (value?.toString() ?? '').toUpperCase();
            case 'number':
                return typeof value === 'number' ? value.toString() : (value?.toString() ?? '');
            default:
                return value?.toString() || '';
        }
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

    public toggleSort(column: TableColumn): void {
        if (!column.sort) return;
        if (this.sortKey !== column.key) {
            this.sortKey = column.key;
            this.sortDir = 'asc';
        } else {
            this.sortDir = this.sortDir === 'asc' ? 'desc' : (this.sortDir === 'desc' ? null : 'asc');
            if (this.sortDir === null) this.sortKey = undefined;
        }
        this.currentPage = 1;
    }

    public onFilterChange(): void {
        // Lors d'une modification de filtre, on revient à la première page
        this.currentPage = 1;
    }

    public selectRow(entity: T): void {
        this.selectedEntity = this.selectedEntity === entity ? null : entity;
    }

    public hasSelection(): boolean {
        return !!this.selectedEntity;
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
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Supprimé',
                    detail: 'Données supprimées.',
                    life: 2000
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Echec',
                    detail: 'Impossible de supprimer les données.',
                    life: 2000
                });
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
