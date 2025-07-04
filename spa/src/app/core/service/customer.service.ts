import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';
import {CustomerDto} from '../model/dto/customer.dto';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private apiBaseUrl = '/api/customers';

  constructor(
    private http: HttpClient,
    private sseService: SseService
  ) {
  }

  getAllCustomers(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(this.apiBaseUrl);
  }

  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.apiBaseUrl, customer);
  }

  updateCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiBaseUrl}/${customer.customerId}`, customer);
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${customerId}`);
  }

  subscribeToCustomerUpdates(): Observable<any> {
    return this.sseService.getServerSentEvents('customers');
  }
}
