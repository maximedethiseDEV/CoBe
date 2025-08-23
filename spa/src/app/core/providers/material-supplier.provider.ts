import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Contact, MaterialSupplier} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class MaterialSupplierProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<MaterialSupplier[]> {
        return this.http.get<MaterialSupplier[]>(`${environment.url.api}/material-suppliers/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<MaterialSupplier>> {
        return this.http.get(`${environment.url.api}/material-suppliers`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<MaterialSupplier> {
        return this.http.get(`${environment.url.api}/material-suppliers/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(materialSupplier: MaterialSupplier): Observable<MaterialSupplier> {
        return this.http.post(`${environment.url.api}/material-suppliers`, materialSupplier).pipe(
            map((response: any) => response)
        );
    }

    public update(materialSupplier: Partial<MaterialSupplier>): Observable<Pagination<MaterialSupplier>> {
        return this.http.put(`${environment.url.api}/material-suppliers/${materialSupplier.id}`, materialSupplier).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/material-suppliers/${id}`);
    }
 }
