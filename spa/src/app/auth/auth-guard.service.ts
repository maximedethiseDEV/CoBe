import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = next.routeConfig?.data?.['role'];
    if (this.authService.isLoggedIn() && this.authService.isUserInRole(requiredRole)) {
      return true;
    }

    this.router.navigateByUrl('login');
    return false;
  }
}
