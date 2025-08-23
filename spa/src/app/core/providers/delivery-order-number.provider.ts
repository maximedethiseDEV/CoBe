import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Contact, DeliveryOrderNumber} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class DeliveryOrderNumberProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<DeliveryOrderNumber[]> {
        return this.http.get<DeliveryOrderNumber[]>(`${environment.url.api}/unique-delivery-numbers/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<DeliveryOrderNumber>> {
        return this.http.get(`${environment.url.api}/unique-delivery-numbers`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<DeliveryOrderNumber> {
        return this.http.get(`${environment.url.api}/unique-delivery-numbers/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(deliveryOrderNumber: DeliveryOrderNumber): Observable<DeliveryOrderNumber> {
        return this.http.post(`${environment.url.api}/unique-delivery-numbers`, deliveryOrderNumber).pipe(
            map((response: any) => response)
        );
    }

    public update(deliveryOrderNumber: Partial<DeliveryOrderNumber>): Observable<Pagination<DeliveryOrderNumber>> {
        return this.http.put(`${environment.url.api}/unique-delivery-numbers/${deliveryOrderNumber.id}`, deliveryOrderNumber).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/unique-delivery-numbers/${id}`);
    }
 }
