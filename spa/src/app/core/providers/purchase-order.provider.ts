import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {PurchaseOrder} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class PurchaseOrderProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<PurchaseOrder>> {
        return this.http.get(`${environment.url.api}/purchase-orders`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<PurchaseOrder> {
        return this.http.get(`${environment.url.api}/purchase-orders/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
        return this.http.post(`${environment.url.api}/purchase-orders`, purchaseOrder).pipe(
            map((response: any) => response)
        );
    }

    public update(purchaseOrder: Partial<PurchaseOrder>): Observable<Pagination<PurchaseOrder>> {
        return this.http.put(`${environment.url.api}/purchase-orders/${purchaseOrder.id}`, purchaseOrder).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/purchase-orders/${id}`);
    }
 }
