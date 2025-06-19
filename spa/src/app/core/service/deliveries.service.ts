import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DeliveryDto} from '../model/dto/delivery.dto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiBaseUrl = '/api/deliveries';

  constructor(private http: HttpClient) {}

  getAllDeliveries(): Observable<DeliveryDto[]> {
    return this.http.get<DeliveryDto[]>(this.apiBaseUrl);
  }
}
