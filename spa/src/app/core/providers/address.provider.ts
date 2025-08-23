import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Address, Contact} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class AddressProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<Address[]> {
        return this.http.get<Address[]>(`${environment.url.api}/addresses/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<Address>> {
        return this.http.get(`${environment.url.api}/addresses`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Address> {
        return this.http.get(`${environment.url.api}/addresses/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(address: Address): Observable<Address> {
        return this.http.post(`${environment.url.api}/addresses`, address).pipe(
            map((response: any) => response)
        );
    }

    public update(address: Partial<Address>): Observable<Pagination<Address>> {
        return this.http.put(`${environment.url.api}/addresses/${address.id}`, address).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/addresses/${id}`);
    }
 }
