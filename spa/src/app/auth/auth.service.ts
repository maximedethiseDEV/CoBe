import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

/**
 * Service responsible for handling authentication and authorization tasks.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'app.token';
  private readonly ROLES_KEY = 'app.roles';

  constructor(private apiService: ApiService) {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) != null;
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.apiService.postData('login', loginData);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLES_KEY);
  }

  isUserInRole(role: string): boolean {
    const roles = sessionStorage.getItem(this.ROLES_KEY);
    if (!roles) return false;

    return roles.split(',').includes(role);
  }
}
