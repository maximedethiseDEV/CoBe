import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Delivery} from '../../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiBaseUrl = '/api/deliveries';

  constructor(private http: HttpClient) {}

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiBaseUrl);
  }
}
