import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Address, Contact} from '@core/models';
import {Pagination} from '@core/types/pagination.type';
import {Profile} from '@core/models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileProvider {
    private http: HttpClient = inject(HttpClient);

    public get(params?: any): Observable<Profile> {
        return this.http.get(`${environment.url.api}/me`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public update(profile: Partial<Profile>): Observable<Pagination<Profile>> {
        return this.http.put(`${environment.url.api}/me/${profile.id}`, profile).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/me/${id}`);
    }
 }
