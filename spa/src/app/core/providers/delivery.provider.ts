import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Delivery} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class DeliveryProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<Delivery>> {
        return this.http.get(`${environment.url.api}/deliveries`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Delivery> {
        return this.http.get(`${environment.url.api}/deliveries/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(delivery: Delivery): Observable<Delivery> {
        return this.http.post(`${environment.url.api}/deliveries`, delivery).pipe(
            map((response: any) => response)
        );
    }

    public update(delivery: Partial<Delivery>): Observable<Pagination<Delivery>> {
        return this.http.put(`${environment.url.api}/deliveries/${delivery.id}`, delivery).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/deliveries/${id}`);
    }
 }
