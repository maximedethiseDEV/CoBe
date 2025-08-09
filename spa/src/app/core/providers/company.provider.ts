import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Company} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class CompanyProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<Company>> {
        return this.http.get(`${environment.url.api}/companies`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Company> {
        return this.http.get(`${environment.url.api}/companies/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(company: Company): Observable<Company> {
        return this.http.post(`${environment.url.api}/companies`, company).pipe(
            map((response: any) => response)
        );
    }

    public update(company: Partial<Company>): Observable<Pagination<Company>> {
        return this.http.put(`${environment.url.api}/companies/${company.id}`, company).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/companies/${id}`);
    }
 }
