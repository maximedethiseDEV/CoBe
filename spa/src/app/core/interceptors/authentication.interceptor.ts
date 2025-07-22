import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '@core/services';
import {catchError, throwError} from 'rxjs';

export const AuthenticationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
    const token: string = authenticationService.getToken();

    if (token) {
        request = request.clone({
            withCredentials: true,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(request).pipe(
        catchError((error: any) => {
            if (error.status === 401) {
                router.navigate(['']);
            }

            return throwError(() => error);
        })
    );
};
