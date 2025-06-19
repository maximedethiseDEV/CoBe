// core/service/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OrderDto} from '../model/dto/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = '/api/orders'; // Ajuste selon ton backend

  constructor(private http: HttpClient) {}

  createOrder(order: OrderDto | null, file?: File): Observable<void> {
    const formData = new FormData();
    formData.append('order', new Blob([JSON.stringify(order)], { type: 'application/json' }));
    if (file) {
      formData.append('fichier', file, file.name);
    }

    return this.http.post<void>(`${this.baseUrl}`, formData);
  }

  getAll(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}`);
  }
}
