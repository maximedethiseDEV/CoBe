import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Product} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class ProductProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<Product>> {
        return this.http.get(`${environment.url.api}/products`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Product> {
        return this.http.get(`${environment.url.api}/products/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(product: Product): Observable<Product> {
        return this.http.post(`${environment.url.api}/products`, product).pipe(
            map((response: any) => response)
        );
    }

    public update(product: Partial<Product>): Observable<Pagination<Product>> {
        return this.http.put(`${environment.url.api}/products/${product.id}`, product).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/products/${id}`);
    }
 }
