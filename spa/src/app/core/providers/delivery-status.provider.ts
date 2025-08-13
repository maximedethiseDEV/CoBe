import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {DeliveryStatus} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class DeliveryStatusProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<DeliveryStatus>> {
        return this.http.get(`${environment.url.api}/delivery-status`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<DeliveryStatus> {
        return this.http.get(`${environment.url.api}/delivery-status/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(deliveryStatus: DeliveryStatus): Observable<DeliveryStatus> {
        return this.http.post(`${environment.url.api}/delivery-status`, deliveryStatus).pipe(
            map((response: any) => response)
        );
    }

    public update(deliveryStatus: Partial<DeliveryStatus>): Observable<Pagination<DeliveryStatus>> {
        return this.http.put(`${environment.url.api}/delivery-status/${deliveryStatus.id}`, deliveryStatus).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/delivery-status/${id}`);
    }
 }
