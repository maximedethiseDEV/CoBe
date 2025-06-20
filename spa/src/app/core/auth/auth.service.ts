import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'app.token';
  private readonly ROLES_KEY = 'app.roles';

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apiService: ApiService) {}

  private hasToken(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) != null;
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.postData('auth/token', { username, password } );
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLES_KEY);
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    this.loggedInSubject.next(true);
  }

  isUserInRole(role: string): boolean {
    const roles = sessionStorage.getItem(this.ROLES_KEY);
    if (!roles) return false;
    return roles.split(',').includes(role);
  }
}
