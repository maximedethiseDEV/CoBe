import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Country} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class CountryProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<Country>> {
        return this.http.get(`${environment.url.api}/countries`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Country> {
        return this.http.get(`${environment.url.api}/countries/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(country: Country): Observable<Country> {
        return this.http.post(`${environment.url.api}/countries`, country).pipe(
            map((response: any) => response)
        );
    }

    public update(country: Partial<Country>): Observable<Pagination<Country>> {
        return this.http.put(`${environment.url.api}/countries/${country.id}`, country).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/countries/${id}`);
    }
 }
