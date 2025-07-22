import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationProvider {
    private http: HttpClient = inject(HttpClient);

    public login(params: {username: string, password: string}): Observable<{token: string}> {
        return this.http.post(`${environment.url.api}/auth/token`, params).pipe(
            map((response: any) => response)
        );
    }

    public register(newUser: any): Observable<unknown> {
        return this.http.post(`${environment.url.api}/register`, newUser).pipe(
            map((response: any) => response)
        );
    }
}
