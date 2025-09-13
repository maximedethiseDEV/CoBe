import {Component, OnDestroy, OnInit, inject, HostListener} from '@angular/core';
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
    readonly createIcon: any = LucideIconsList.Plus;
    readonly refreshIcon: any = LucideIconsList.RefreshCcw;
    readonly sortAscIcon: any = LucideIconsList.ArrowDownWideNarrow;
    readonly sortDescIcon: any = LucideIconsList.ArrowUpWideNarrow;
    readonly filterIcon: any = LucideIconsList.ArrowDownUp;
    readonly updateIcon: any = LucideIconsList.SquarePen;
    readonly deleteIcon: any = LucideIconsList.Trash2;
    readonly nextPageIcon: any = LucideIconsList.ChevronRight;
    readonly previousPageIcon: any = LucideIconsList.ChevronLeft;
    readonly emptyDataIcon: any = LucideIconsList.Inbox;
    readonly iconValid: any = LucideIconsList.Check;

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

    // Filtres par colonne (clé de colonne = valeur de filtre)
    protected searchTerm: string = '';
    public filters: Record<string, any> = {};
    public sortKey?: string;
    public sortDir: 'asc' | 'desc' | null = null;

    public selectedEntity: T | null = null;

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
                return isTrue ?
                    '<i-lucide [name]="iconValid"/>'
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

    // Méthodes utilitaires
    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => current?.[key], obj);
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

    @HostListener('window:keydown.control.n', ['$event'])
    handleCreateShortCut(event: KeyboardEvent): void {
            this.createEntity();
    }

    @HostListener('window:keydown.control.e', ['$event'])
    handleUpdateShortcut(event: KeyboardEvent): void {
        if (this.selectedEntity) {
            this.updateEntity(this.selectedEntity);
        }
    }

    @HostListener('window:keydown.control.d', ['$event'])
    handleDeleteShortcut(event: KeyboardEvent): void {
        if (this.selectedEntity) {
            this.deleteEntity(this.selectedEntity);
        }
    }

    @HostListener('window:keydown.control.r', ['$event'])
    handleRefreshShortcut(event: KeyboardEvent): void {
        this.refreshData()
    }

    @HostListener('window:keydown.arrowright', ['$event'])
    handleNextPageShortcut(event: KeyboardEvent): void {
        this.goToPage(this.currentPage + 1)
    }

    @HostListener('window:keydown.arrowleft', ['$event'])
    handlePreviousPageShortcut(event: KeyboardEvent): void {
        this.goToPage(this.currentPage - 1)
    }

    @HostListener('window:keydown.arrowdown', ['$event'])
    handleNextSelection(event: KeyboardEvent): void {
        if (!this.selectedEntity && this.paginatedData.length > 0) {
            this.selectedEntity = this.paginatedData[0];
        } else if (this.selectedEntity) {
            const index = this.paginatedData.findIndex(e => e.id === this.selectedEntity?.id);
            if (index >= 0 && index < this.paginatedData.length - 1) {
                this.selectedEntity = this.paginatedData[index + 1];
            }
        }
    }

    @HostListener('window:keydown.arrowup', ['$event'])
    handlePreviousSelection(event: KeyboardEvent): void {
        if (this.selectedEntity) {
            const index = this.paginatedData.findIndex(e => e.id === this.selectedEntity?.id);
            if (index > 0) {
                this.selectedEntity = this.paginatedData[index - 1];
            }
        }
    }

    @HostListener('window:keydown.escape', ['$event'])
    handleEscapeSelection(event: KeyboardEvent): void {
        this.selectedEntity = null;
    }
}
