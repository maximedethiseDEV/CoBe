import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Customer} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class CustomerProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<Customer>> {
        return this.http.get(`${environment.url.api}/customers`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Customer> {
        return this.http.get(`${environment.url.api}/customers/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(customer: Customer): Observable<Customer> {
        return this.http.post(`${environment.url.api}/customers`, customer).pipe(
            map((response: any) => response)
        );
    }

    public update(customer: Partial<Customer>): Observable<Pagination<Customer>> {
        return this.http.put(`${environment.url.api}/customers/${customer.id}`, customer).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/customers/${id}`);
    }
 }
