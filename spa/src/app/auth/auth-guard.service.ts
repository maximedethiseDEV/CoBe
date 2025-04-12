import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * AuthGuard is a route guard used to protect routes based on user authentication and roles.
 *
 * It verifies if the user is logged in and if they have the necessary role to access the specified route.
 * If the user meets the required conditions, they are allowed access.
 * Otherwise, they are redirected to the login page.
 *
 * This guard relies on the AuthService to check the user's authentication and role, and the Router
 * to handle navigation in case access is denied.
 *
 * The role required to access a route should be specified in the route's data property under the key 'role'.
 */
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
