import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '@core/services';

export const AuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
    const requiredRole: string[] = route.data?.['role'];

    if (authenticationService.isAuthenticated() && authenticationService.hasRole(requiredRole)) {
        return true;
    }

    router.navigate(['']);
    return false;
}
