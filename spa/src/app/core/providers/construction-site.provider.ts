import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {ConstructionSite, Contact} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class ConstructionSiteProvider {
    private http: HttpClient = inject(HttpClient);

    public getAllNoPage(params?: any): Observable<ConstructionSite[]> {
        return this.http.get<ConstructionSite[]>(`${environment.url.api}/construction-sites/all`, {params});
    }

    public getAll(params?: any): Observable<Pagination<ConstructionSite>> {
        return this.http.get(`${environment.url.api}/construction-sites`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<ConstructionSite> {
        return this.http.get(`${environment.url.api}/construction-sites/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(constructionSite: ConstructionSite): Observable<ConstructionSite> {
        return this.http.post(`${environment.url.api}/construction-sites`, constructionSite).pipe(
            map((response: any) => response)
        );
    }

    public update(constructionSite: Partial<ConstructionSite>): Observable<Pagination<ConstructionSite>> {
        return this.http.put(`${environment.url.api}/construction-sites/${constructionSite.id}`, constructionSite).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/construction-sites/${id}`);
    }
 }
