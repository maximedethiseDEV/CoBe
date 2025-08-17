import {Injectable, inject} from '@angular/core';
import {Observable, map} from 'rxjs';
import {AuthenticationProvider} from '@core/providers';
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private authenticationProvider: AuthenticationProvider = inject(AuthenticationProvider);
    private readonly TOKEN_KEY: string = 'app.token';
    private readonly ROLES_KEY: string = 'app.roles';

    public getToken(): string {
        return sessionStorage.getItem(this.TOKEN_KEY) || '';
    }

    private setToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    private decodeToken(): any {
        const token: string = this.getToken();

        if (token) {
            try {
                return jwtDecode(token);
            } catch (error: any) {
                console.error('Erreur lors du décodage du token :', error);
                return null;
            }
        }

        return null;
    }

    private computeRoles(): void {
        const decodedToken: any = this.decodeToken();
        const scope: string = decodedToken?.scope || '';

        if (scope) {
            const roles: string = scope.replaceAll('ROLE_', '');
            this.setRoles(roles);
        }
    }

    private setRoles(roles: string): void {
        sessionStorage.setItem(this.ROLES_KEY, roles);
    }

    public hasRole(roles: string[]): boolean {
        const storedRole: string|null = sessionStorage.getItem(this.ROLES_KEY);
        return storedRole ? roles.includes(storedRole) : false;
    }

    public isAuthenticated(): boolean {
        return !!sessionStorage.getItem(this.TOKEN_KEY);
    }

    public getFirstName(): string {
        const decodedToken: any = this.decodeToken();

        return decodedToken?.sub || '';
    }

    public login(username: string, password: string): Observable<{token?: string, message?: string}> {
        return this.authenticationProvider.login({username, password}).pipe(
            map((response: {token: string}) => {
                if (response?.token) {
                    this.setToken(response.token);
                    this.computeRoles();

                    return {
                        token: response.token
                    };
                } else {
                    return {
                        message: 'Connexion échouée. Jeton ou rôles non reçus.'
                    };
                }
            })
        );
    }

    public register(newUser: any): Observable<any> {
        return this.authenticationProvider.register(newUser);
    }

    public logout(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.ROLES_KEY);
    }
}
