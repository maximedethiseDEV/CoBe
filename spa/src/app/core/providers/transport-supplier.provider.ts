import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {TransportSupplier} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class TransportSupplierProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<TransportSupplier>> {
        return this.http.get(`${environment.url.api}/transport-suppliers`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<TransportSupplier> {
        return this.http.get(`${environment.url.api}/transport-suppliers/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(transportSupplier: TransportSupplier): Observable<TransportSupplier> {
        return this.http.post(`${environment.url.api}/transport-suppliers`, transportSupplier).pipe(
            map((response: any) => response)
        );
    }

    public update(transportSupplier: Partial<TransportSupplier>): Observable<Pagination<TransportSupplier>> {
        return this.http.put(`${environment.url.api}/transport-suppliers/${transportSupplier.id}`, transportSupplier).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/transport-suppliers/${id}`);
    }
 }
