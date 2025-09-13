import { Component, inject, OnInit, HostListener } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Delivery, EntityModel} from '@core/models';
import {TableColumn} from '@core/types';
import {DeliveryProvider} from '@core/providers';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-schedule',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        LucideAngularModule
    ],
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
    private messageService = inject(MessageService);
    private route = inject(ActivatedRoute);
    protected router: Router = inject(Router);
    private deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    readonly labelHeader: string = 'Affecter les livraisons';
    readonly iconHeader = LucideIconsList.CalendarClock;
    readonly sendIcon: any = LucideIconsList.Mail;
    readonly refreshIcon: any = LucideIconsList.RefreshCcw;
    // Icônes pour tri/états (aligné avec le style DeliveryTable)
    readonly filterIcon: any = LucideIconsList.ArrowDownUp;
    readonly sortAscIcon: any = LucideIconsList.ArrowDownWideNarrow;
    readonly sortDescIcon: any = LucideIconsList.ArrowUpWideNarrow;
    readonly emptyDataIcon: any = LucideIconsList.Inbox;
    readonly previousPageIcon: any = LucideIconsList.ChevronLeft;
    readonly nextPageIcon: any = LucideIconsList.ChevronRight;

    private dragImg: HTMLImageElement = new Image();
    private dragImgLoaded = false;

    public fromDate: string = '';
    public toDate: string = '';

    public selectedEntity: Delivery | null = null;

    public deliveries: Delivery[] = [];
    public filteredDeliveries: Delivery[] = [];

    public tableColumns: TableColumn[] = [
        { key: 'actualDeliveryBegin',   type: 'date',   translate: 'Début de livraison',    sort: true },
        { key: 'actualDeliveryEnd',     type: 'date',   translate: 'Fin de livraison',      sort: true },
        { key: 'quantity',              type: 'text',   translate: 'Quantité',              sort: true },
        { key: 'statusId',              type: 'uuid',   translate: 'Statut',                sort: true },
        { key: 'orderId',               type: 'uuid',   translate: 'Numéro de commande',    sort: true },
        { key: 'transportSupplierName',   type: 'text',   translate: 'Transporteur',          sort: true },
        { key: 'deliveryOrderNumberId', type: 'uuid',   translate: 'Numéro de chargement',  sort: true }
    ];

    public filters: Record<string, any> = {};
    // Tri & pagination (style base-table)
    public sortKey: string | null = null;
    public sortDir: 'asc' | 'desc' | null = null;
    public currentPage: number = 1;
    public pageSize: number = 20;


    // Right list: transporters
    public transporters: { id: string; name: string }[] = [];
    public transporterFilter: string = '';

    public assigned: Record<string, string[]> = {}; // transporterId -> deliveryIds

    constructor() {}

    ngOnInit(): void {
        this.route.data.subscribe(({ deliveries, transportSuppliers }) => {
            const dlv = (deliveries || []) as any[];
            const trs = (transportSuppliers || []) as any[];

            this.deliveries = dlv as Delivery[];
            // init column filters keys
            this.tableColumns.forEach(col => { if (!(col.key in this.filters)) this.filters[col.key] = ''; });

            this.transporters = trs.map(t => ({
                id: t.id,
                name: t.companyName || t.contactName || 'Transporteur'
            }));

            this.applyDateFilterDefault();
        });

        this.dragImg.onload = () => { this.dragImgLoaded = true; };
        this.dragImg.onerror = () => { this.dragImgLoaded = false; };
        this.dragImg.src = 'assets/images/drag-icon.png';
    }

    public applyDateFilterDefault(): void {
        const now = new Date();
        const from = new Date(now);
        const to = new Date(now);
        to.setDate(now.getDate() + 1); // tomorrow
        this.fromDate = this.toInputDate(from);
        this.toDate = this.toInputDate(to);
        this.applyDateFilter();
    }

    // Actions d'en-tête façon DeliveryTable
    public refreshData(): void {
        this.deliveryProvider.getAllNoPage().subscribe({
            next: (dlv: Delivery[]) => {
                this.deliveries = dlv;
                this.applyDateFilter();
                this.selectedEntity = null;
            },
            error: (err) => console.error('Erreur de rafraîchissement:', err)
        });
    }

    // Implémentation locale et explicite de l'action "Envoyer"
    public sendEntity(entity: Delivery): void {
        const id = (entity as EntityModel).id;
        this.deliveryProvider.sendEmail(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Envoyé',
                    detail: 'Livraison envoyé au transporteur',
                    life: 2000
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Echec',
                    detail: 'Echec de l\'envoi du mail',
                    life: 2000
                });
            }
        });
    }

    private toInputDate(d: Date): string {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    public applyDateFilter(): void {
        const from = this.fromDate ? new Date(this.fromDate) : null;
        const to = this.toDate ? new Date(this.toDate) : null;
        this.filteredDeliveries = this.deliveries.filter(d => {
            const raw = d.actualDeliveryBegin || d.actualDeliveryEnd;
            if (!raw) return false;
            const dt = new Date(raw);
            const day = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
            const fromDay = from ? new Date(from.getFullYear(), from.getMonth(), from.getDate()) : null;
            const toDay = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate()) : null;
            if (fromDay && day < fromDay) return false;
            if (toDay && day > toDay) return false;
            return true;
        });
    }

    // column filters like BaseTable, but applied after date filter
    public get filteredByColumns(): Delivery[] {
        const source = this.filteredDeliveries;
        const active = Object.entries(this.filters).filter(([_, v]) => v !== '' && v !== null && v !== undefined);
        if (active.length === 0) return source;
        return source.filter(entity => {
            return active.every(([key, rawVal]) => {
                const column = this.tableColumns.find(c => c.key === key);
                const value: any = (entity as any)[key];
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
                        } catch { return true; }
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

    public onFilterChange(): void {
        // no-op: getter will recompute
    }

    public getColumnValue(entity: Delivery, column: TableColumn): string {
        const value: any = (entity as any)[column.key];
        switch (column.type) {
            case 'date': return value ? new Date(value).toLocaleDateString('fr-FR') : '';
            case 'number': return typeof value === 'number' ? value.toString() : (value?.toString() ?? '');
            case 'text': return (value?.toString() ?? '');
            default: return value?.toString() || '';
        }
    }

    public deliveryLabel(d: Delivery): string {
        // Utiliser le nom s'il est disponible
        const name = d.transportSupplierName ? ` – ${d.transportSupplierName}` : '';
        return `Commande ${d.orderId ?? ''} – Qté ${d.quantity ?? ''}${name}`.trim();
    }

    public get filteredTransporters(): { id: string; name: string }[] {
        const term = (this.transporterFilter || '').toLowerCase();
        if (!term) return this.transporters;
        return this.transporters.filter(t => t.name.toLowerCase().includes(term));
    }

    public onDragStart(ev: DragEvent, deliveryId: string): void {
        ev.dataTransfer?.setData('text/plain', deliveryId);
        // Utilise l'image préchargée si disponible
        if (this.dragImgLoaded && ev.dataTransfer) {
            const offsetX = Math.floor(this.dragImg.width / 2);
            const offsetY = Math.floor(this.dragImg.height / 2);
            ev.dataTransfer.setDragImage(this.dragImg, offsetX, offsetY);
        }
        ev.dataTransfer && (ev.dataTransfer.effectAllowed = 'move');
    }

    public allowDrop(ev: DragEvent): void {
        ev.preventDefault();
        ev.dataTransfer!.dropEffect = 'move';
    }

    public onDrop(ev: DragEvent, transporterId: string): void {
        const id = ev.dataTransfer?.getData('text/plain');
        if (!id) return;

        const delivery = this.deliveries.find(d => d.id === id);
        if (!delivery) return;

        // MàJ optimiste locale
        const previousTransporterId = delivery.transportSupplierId;
        delivery.transportSupplierId = transporterId;

        this.deliveryProvider.assignTransportSupplier(id, transporterId).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistré',
                    detail: 'Transporteur affecté',
                    life: 2000
                });
            },
            error: () => {
                // rollback en cas d’échec
                delivery.transportSupplierId = previousTransporterId;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Échec',
                    detail: 'Impossible d’affecter le transporteur',
                    life: 2000
                });
            }
        });
    }

    public getAssignments(transporterId: string): Delivery[] {
        const ids = this.assigned[transporterId] || [];
        return ids.map(id => this.deliveries.find(d => d.id === id)!).filter((x): x is Delivery => !!x);
    }

    // Données filtrées + tri (comme base-table : filteredData -> sorted)
    public get filteredData(): Delivery[] {
        const data = [...this.filteredByColumns];
        if (!this.sortKey || !this.sortDir) return data;

        const col = this.tableColumns.find(c => c.key === this.sortKey);
        const dir = this.sortDir === 'asc' ? 1 : -1;

        return data.sort((a: any, b: any) => {
            const va = a[this.sortKey!];
            const vb = b[this.sortKey!];
            let ca: any = va, cb: any = vb;

            switch (col?.type) {
                case 'number':
                    ca = Number(va) || 0; cb = Number(vb) || 0;
                    break;
                case 'date':
                    ca = va ? new Date(va).getTime() : 0;
                    cb = vb ? new Date(vb).getTime() : 0;
                    break;
                case 'boolean':
                    ca = va ? 1 : 0;
                    cb = vb ? 1 : 0;
                    break;
                default:
                    ca = (va ?? '').toString().toLowerCase();
                    cb = (vb ?? '').toString().toLowerCase();
            }

            if (ca < cb) return -1 * dir;
            if (ca > cb) return 1 * dir;
            return 0;
        });
    }

    // Pagination (style base-table)
    public get totalElements(): number {
        return this.filteredData.length;
    }

    public get totalPages(): number {
        return Math.max(1, Math.ceil(this.totalElements / this.pageSize));
    }

    public get startIndex(): number {
        return (this.currentPage - 1) * this.pageSize;
    }

    public get endIndex(): number {
        return Math.min(this.startIndex + this.pageSize, this.totalElements);
    }

    public get paginatedData(): Delivery[] {
        return this.filteredData.slice(this.startIndex, this.endIndex);
    }

    public goToPage(page: number): void {
        const target = Math.min(Math.max(1, page), this.totalPages);
        if (target !== this.currentPage) {
            this.currentPage = target;
        }
    }

    public getVisiblePages(): number[] {
        const total = this.totalPages;
        const current = this.currentPage;
        const pages: number[] = [];

        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages;
        }

        if (current <= 4) {
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push(total);
        } else if (current >= total - 3) {
            pages.push(1);
            for (let i = total - 4; i <= total; i++) pages.push(i);
        } else {
            pages.push(1, current - 1, current, current + 1, total);
        }

        return pages;
    }

    // Tri (style base-table)
    public toggleSort(column: TableColumn): void {
        if (!column.sort) return;
        if (this.sortKey !== column.key) {
            this.sortKey = column.key;
            this.sortDir = 'asc';
        } else {
            this.sortDir = this.sortDir === 'asc' ? 'desc' : (this.sortDir === 'desc' ? null : 'asc');
            if (!this.sortDir) this.sortKey = null;
        }
        this.currentPage = 1;
    }

    // Sélection (style base-table)
    public selectRow(entity: Delivery): void {
        // suppose que selectedEntity existe déjà ailleurs dans ce composant
        // @ts-ignore
        this.selectedEntity = this.selectedEntity === entity ? null : entity;
    }

    public hasSelection(): boolean {
        // @ts-ignore
        return !!this.selectedEntity;
    }

    @HostListener('window:keydown.control.s', ['$event'])
    handleSendShortcut(): void {
        if (this.selectedEntity) {
            this.sendEntity(this.selectedEntity);
        }
    }

    @HostListener('window:keydown.control.r', ['$event'])
    handleRefreshShortcut(): void {
        this.refreshData()
    }

    @HostListener('window:keydown.arrowright', ['$event'])
    handleNextPageShortcut(): void {
        this.goToPage(this.currentPage + 1)
    }

    @HostListener('window:keydown.arrowleft', ['$event'])
    handlePreviousPageShortcut(): void {
        this.goToPage(this.currentPage - 1)
    }

    @HostListener('window:keydown.arrowdown', ['$event'])
    handleNextSelection(): void {
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
    handlePreviousSelection(): void {
        if (this.selectedEntity) {
            const index = this.paginatedData.findIndex(e => e.id === this.selectedEntity?.id);
            if (index > 0) {
                this.selectedEntity = this.paginatedData[index - 1];
            }
        }
    }

    @HostListener('window:keydown.escape', ['$event'])
    handleEscapeSelection(): void {
        this.selectedEntity = null;
    }
}
