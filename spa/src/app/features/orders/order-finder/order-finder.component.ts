import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {OrderDto} from '../../../core/model/dto/order.dto';
import {DeliveryDto} from '../../../core/model/dto/delivery.dto';
import {DeliveryStatus} from '../../../core/model/delivery-status.model';
import {OrderService} from '../../../core/service/order.service';

@Component({
  selector: 'app-order-finder',
  templateUrl: './order-finder.component.html',
  styleUrls: ['./order-finder.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule]
})
export class OrderFinderComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  orders!: OrderDto[];
  selectedOrders!: OrderDto[];
  metaKey: boolean = true;
  loading: boolean = true;

  readonly SCROLL_HEIGHT = '400rem';
  readonly TABLE_STYLE = { 'min-width': '0rem' };
  readonly rowsPerPageOptions = [100, 250, 500];

  globalFilterFields: string[] = [
    'orderId',
    'order.billingCustomer.company.companyName',
    'order.deliveryCustomer.company.companyName',
    'order.product.productCode',
    'order.quantityOrdered',
    'order.requestedDeliveryDate',
  ];

  // Colonnes du tableau
  columns: { field: string; header: string }[] = [
    {field: 'order.orderId', header: 'ID'},
    {field: 'order.billingCustomer?.company?.companyName', header: "Donneur d'ordre"},
    {field: 'order.deliveryCustomer?.company?.companyName', header: 'Client Livraison'},
    {field: 'order.product?.productCode', header: 'Produit'},
    {field: 'order.quantityOrdered', header: 'Quantité'},
    {field: 'order.requestedDeliveryDate', header: 'Date de livraison'},
  ];

  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
  this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;
    this.ordersService.getAllOrders().subscribe((data: OrderDto[]) => {
        this.orders = data;
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
  }

  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

}
