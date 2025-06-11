import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces pour GetOrderDto et PostOrderDto (à adapter selon Java)
export interface GetOrderDto {
  orderId: number;
  billingCustomerId: number;
  billingCustomerName: string;
  deliveryCustomerId: number;
  deliveryCustomerName: string;
  productId: number;
  productName: string;
  quantity: number;
  requestedDeliveryDate: string;
  requestedDeliveryTime: string;
  shareDetailsId: number;
}

export interface PostOrderDto {
  orderId?: number; // Facultatif pour créer une commande
  billingCustomerId: number;
  deliveryCustomerId?: number;
  productId: number;
  quantity: number;
  requestedDeliveryDate: string;
  requestedDeliveryTime?: string;
  shareDetailsId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderController {
  private apiUrl = 'http://localhost:8080/orders'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les commandes
  getAllOrders(): Observable<GetOrderDto[]> {
    return this.http.get<GetOrderDto[]>(this.apiUrl);
  }

  // Récupérer les commandes d'un client spécifique
  getOrdersByCustomer(customerId: number): Observable<GetOrderDto[]> {
    return this.http.get<GetOrderDto[]>(`${this.apiUrl}/customers/${customerId}`);
  }

  // Créer une nouvelle commande
  createOrder(order: PostOrderDto): Observable<GetOrderDto> {
    return this.http.post<GetOrderDto>(this.apiUrl, order);
  }

  // Mettre à jour une commande existante
  updateOrder(orderId: number, order: PostOrderDto): Observable<GetOrderDto> {
    return this.http.put<GetOrderDto>(`${this.apiUrl}/${orderId}`, order);
  }

  // Supprimer une commande
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}
