import { Component, OnInit } from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import {GetOrderDto, OrderController, PostOrderDto} from '../../features/orders/order.controller'; // Pour les notifications

@Component({
  selector: 'app-schedule',
  imports: [
    TableModule,
    /* Modules habituels */],
  providers: [OrderController, MessageService], // Injection d'OrderController et MessageService
  templateUrl: './schedule.component-old.html',
  styleUrls: ['./schedule.component-old.css']
})
export class ScheduleComponentOld implements OnInit {
  orders: GetOrderDto[] = []; // Liste des commandes
  loading: boolean = true; // Gestion du loader

  constructor(private orderController: OrderController, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchOrders(); // Charger les commandes à l'init
  }

  // Récupérer toutes les commandes
  fetchOrders(): void {
    this.loading = true;
    this.orderController.getAllOrders().subscribe({
      next: (orders: GetOrderDto[]) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de récupérer les commandes.' });
      }
    });
  }

  // Créer une commande
  createOrder(): void {
    const newOrder: PostOrderDto = {
      billingCustomerId: 1, // Exemple d’ID client facturation
      productId: 123, // Exemples statiques
      quantity: 10,
      requestedDeliveryDate: '2025-06-20'
    };

    this.orderController.createOrder(newOrder).subscribe({
      next: (createdOrder: GetOrderDto) => {
        this.orders.push(createdOrder); // Ajouter la commande à la liste
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande créée avec succès.' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création de la commande.' });
      }
    });
  }

  // Supprimer une commande
  deleteOrder(orderId: number): void {
    this.orderController.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((order) => order.orderId !== orderId); // MAJ locale
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande supprimée.' });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression.' })
    });
  }

  // Méthode pour nettoyer le filtre d’un tableau
  clear(table: Table): void {
    table.clear();
  }
}
