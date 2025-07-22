import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {Contact} from '@core/models';
import {PaginatedResponse} from '@core/models/paginated-response.model';

@Injectable({
    providedIn: 'root'
})
export class ContactProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<PaginatedResponse<Contact>> {
        return this.http.get(`${environment.url.api}/contacts`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<Contact> {
        return this.http.get(`${environment.url.api}/contacts/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(contact: Contact): Observable<Contact> {
        return this.http.post(`${environment.url.api}/contacts`, contact).pipe(
            map((response: any) => response)
        );
    }

    public update(contact: Partial<Contact>): Observable<Contact> {
        return this.http.put(`${environment.url.api}/contacts/${contact.id}`, contact).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/contacts/${id}`);
    }
 }
