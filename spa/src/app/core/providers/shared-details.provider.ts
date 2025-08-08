import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';
import {SharedDetails} from '@core/models';
import {Pagination} from '@core/types/pagination.type';

@Injectable({
    providedIn: 'root'
})
export class SharedDetailsProvider {
    private http: HttpClient = inject(HttpClient);

    public getAll(params?: any): Observable<Pagination<SharedDetails>> {
        return this.http.get(`${environment.url.api}/shared-details`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public get(id: string, params?: any): Observable<SharedDetails> {
        return this.http.get(`${environment.url.api}/shared-details/${id}`, {params}).pipe(
            map((response: any) => response)
        );
    }

    public create(formData: FormData): Observable<SharedDetails> {
        return this.http.post(`${environment.url.api}/shared-details`, formData).pipe(
            map((response: any) => response)
        );
    }

    public update(sharedDetails: Partial<SharedDetails>): Observable<Pagination<SharedDetails>> {
        return this.http.put(`${environment.url.api}/shared-details/${sharedDetails.id}`, sharedDetails).pipe(
            map((response: any) => response)
        );
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.url.api}/shared-details/${id}`);
    }

    public createMultipart(formData: FormData): Observable<SharedDetails> {
        return this.http.post(`${environment.url.api}/shared-details/upload`, formData)
            .pipe(map((response: any) => response));
    }

    public updateMultipart(formData: FormData): Observable<SharedDetails> {
        return this.http.put(`${environment.url.api}/shared-details/upload/${formData.get("id")}`, formData)
            .pipe(map((response: any) => response));
    }

    /** GET Blob (Téléchargement) -> /shared-details/upload/{id} */
    public downloadFileById(id: string): Observable<Blob> {
        return this.http.get(`${environment.url.api}/shared-details/upload/${id}`, {
            responseType: 'blob' // pour récupérer le fichier brut
        });
    }
 }
