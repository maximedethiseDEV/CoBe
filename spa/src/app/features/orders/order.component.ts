import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderFinderComponent } from './order-finder/order-finder.component';
import { CommonModule } from '@angular/common';
import {OrderDto} from '../../core/model/dto/order.dto';
import {OrderController} from '../../core/controller/order.controller';

@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    OrderFormComponent,
    OrderFinderComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderDto[] = [];

  selectedOrder: OrderDto | null = null;

  constructor(private orderController: OrderController) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderController.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    });
  }

  // Ajout de cette méthode
  onOrderSelected(order: OrderDto) {
    this.selectedOrder = order;
  }

  onOrderChange(order: OrderDto) {
    const index = this.orders.findIndex(o => o.orderId === order.orderId);
    if (index !== -1) {
      this.orders[index] = order;
    } else {
      this.orders.push(order);
    }
    this.selectedOrder = null;
  }

}
