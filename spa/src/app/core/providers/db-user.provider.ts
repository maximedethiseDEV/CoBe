import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {DbUser} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class DbUserProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<DbUser[]> {
        return this.http.get<DbUser[]>(`${environment.url.api}/users/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<DbUser>> {
        return this.http.get(`${environment.url.api}/users`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<DbUser> {
        return this.http.get(`${environment.url.api}/users/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(user: DbUser): Observable<DbUser> {
        return this.http.post(`${environment.url.api}/users`, user).pipe(
            map((response: any) => response)
        );
    }

    public update(user: Partial<DbUser>): Observable<Pagination<DbUser>> {
        return this.http.put(`${environment.url.api}/users/${user.id}`, user).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/users/${id}`);
    }
 }
