import { Component, OnInit, ViewChild } from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { DeliveryService } from '../../features/deliveries/deliveries.service';
import { Delivery } from '../../models/delivery.model';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Button } from 'primeng/button';
import {DatePipe, NgForOf} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import { DeliveryStatus } from '../../models/delivery-status.model';
import {SelectButton} from 'primeng/selectbutton';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  imports: [
    TableModule,
    FormsModule,
    MultiSelect,
    DatePicker,
    Button,
    DatePipe,
    SelectButton,
  ],
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('dt') dt!: Table;



  deliveries: Delivery[] = [];
  statuses: DeliveryStatus[] = [];
  selectedDeliveries: Delivery[] = [];
  metaKey: boolean = true;
  actualDeliveryDateFilter?: Date;
  statusFilter?: string[];
  sizes!: any[];
  selectedSize: any = undefined;
  loading: boolean = true;

  readonly SCROLL_HEIGHT = '400rem';
  readonly TABLE_STYLE = { 'min-width': '0rem' };
  readonly rowsPerPageOptions = [100, 250, 500];
  globalFilterFields: string[] = [
    'deliveryId',
    'order.product.productCode',
    'order.quantityOrdered',
    'transportSupplier.company.companyName',
    'actualDeliveryDate',
    'quantityDelivered',
  ];

  // Colonnes du tableau
  columns: { field: string; header: string }[] = [
    {field: 'delivery.deliveryId', header: 'ID'},
    {field: 'delivery?.order?.product?.productCode', header: 'Code Produit'},
    {field: 'delivery?.order?.quantityOrdered', header: 'Quantité commandée'},
    {field: 'delivery?.actualDeliveryDate | date: \'yyyy-MM-dd\'', header: 'Date de livraison effective'},
    {field: 'delivery?.transportSupplier?.company?.companyName', header: 'Transporteur'},
    {field: 'delivery?.quantity', header: 'Quantité livrée'},
    {field: 'delivery.status?.status', header: 'Statut'}
  ];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.fetchDeliveries();

    // Récupération des statuts à partir de l'énum
    this.statuses = ['Supprimé', 'Non affrété', 'Planifié', 'Affrété', 'Chargé', 'Livré'];

    this.sizes = [
      { name: 'Small', value: 'small' },
      { name: 'Normal', value: undefined },
      { name: 'Large', value: 'large' }
    ];
  }

  fetchDeliveries(): void {
    this.loading = true;
    this.deliveryService.getAllDeliveries().subscribe((data: Delivery[]) => {
        this.deliveries = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des livraisons', error);
        this.loading = false;
      }
    );
  }

  clear(table: Table): void {
    table.clear();
    this.actualDeliveryDateFilter = undefined;
    this.statusFilter = undefined;
  }

  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

}
