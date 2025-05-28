import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

/**
 * AuthService is a service responsible for handling user authentication
 * and authorization. It interacts with the backend API to manage login
 * and provides utility functions to check user authentication and roles.
 *
 * This service stores the authentication token and roles in the
 * session storage for maintaining user sessions.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'app.token';
  private readonly ROLES_KEY = 'app.roles';

  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.apiService.postData('auth/token', loginData);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLES_KEY);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) != null;
  }

  isUserInRole(role: string): boolean {
    const roles = sessionStorage.getItem(this.ROLES_KEY);
    if (!roles) return false;

    return roles.split(',').includes(role);
  }
}
