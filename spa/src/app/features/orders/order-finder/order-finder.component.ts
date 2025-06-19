import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {OrderDto} from '../../../core/model/dto/order.dto';

@Component({
  selector: 'app-order-finder',
  templateUrl: './order-finder.component.html',
  styleUrls: ['./order-finder.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule]
})
export class OrderFinderComponent {
  @Input() currentCommand: OrderDto | null = null;
  @Input() orders: OrderDto[] = [];
  @Output() select = new EventEmitter<OrderDto>();

  get filteredOrders(): OrderDto[] {
    if (!this.currentCommand) return this.orders;

    return this.orders.filter(order => {
      const searchFilters: boolean[] = [];

      // Filtre sur le client de facturation
      if (this.currentCommand?.billingCustomer?.company?.companyName) {
        searchFilters.push(
          order.billingCustomer.company.companyName.toLowerCase()
            .includes(this.currentCommand.billingCustomer.company.companyName.toLowerCase())
        );
      }

      // Filtre sur le client de livraison
      if (this.currentCommand?.deliveryCustomer?.company?.companyName) {
        const deliveryCustomerName = order.deliveryCustomer?.company?.companyName;
        if (deliveryCustomerName) {
          searchFilters.push(
            deliveryCustomerName.toLowerCase()
              .includes(this.currentCommand.deliveryCustomer.company.companyName.toLowerCase())
          );
        }
      }

      // Filtre sur le produit
      if (this.currentCommand?.product?.productCode) {
        searchFilters.push(
          order.product.productCode.toLowerCase()
            .includes(this.currentCommand.product.productCode.toLowerCase())
        );
      }

      return searchFilters.length === 0 || searchFilters.every(f => f);
    });
  }

  onOrderSelected(order: OrderDto): void {
    this.select.emit(order);
  }
}
