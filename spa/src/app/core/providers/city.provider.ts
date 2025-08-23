import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {City, Contact} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class CityProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<City[]> {
        return this.http.get<City[]>(`${environment.url.api}/cities/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<City>> {
        return this.http.get(`${environment.url.api}/cities`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<City> {
        return this.http.get(`${environment.url.api}/cities/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(city: City): Observable<City> {
        return this.http.post(`${environment.url.api}/cities`, city).pipe(
            map((response: any) => response)
        );
    }

    public update(city: Partial<City>): Observable<Pagination<City>> {
        return this.http.put(`${environment.url.api}/cities/${city.id}`, city).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/cities/${id}`);
    }
 }
