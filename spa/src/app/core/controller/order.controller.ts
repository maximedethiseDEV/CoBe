import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OrderService} from '../service/order.service';
import {OrderDto} from '../model/dto/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderController {
  private apiUrl = 'http://localhost:8080/orders'; // URL de l'API

  constructor(private orderService: OrderService) {}

  // Récupérer toutes les commandes
  getAllOrders(): Observable<OrderDto[]> {
    return this.orderService.getAll();
  }

  submitOrder(order: OrderDto | null , file?: File): Observable<void> {
    return this.orderService.createOrder(order, file);
  }
}
