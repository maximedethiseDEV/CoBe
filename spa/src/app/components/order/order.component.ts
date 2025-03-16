import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData("orders").subscribe(
      response => {
        this.orders = response;
      },
      error => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }

  viewOrder(order: Order) {
    console.log('Viewing order:', order);
    // Ajoutez ici la logique pour visualiser la commande
  }

  editOrder(order: Order) {
    console.log('Editing order:', order);
    // Ajoutez ici la logique pour modifier la commande
  }

  deleteOrder(id: number) {
    console.log('Deleting order with id:', id);
    // Ajoutez ici la logique pour supprimer la commande
    this.orders = this.orders.filter(order => order.orderId !== id);
  }
}
