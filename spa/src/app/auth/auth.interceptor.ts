import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {catchError, throwError} from 'rxjs';

/**
 * AuthInterceptor is an HTTP interceptor function that handles request modification and error handling.
 *
 * This interceptor checks for a token stored in session storage under the key 'app.token', and if one is present,
 * it adds an Authorization header with the token as a Bearer token to the outgoing HTTP request.
 *
 * Additionally, it intercepts any HTTP errors. If a 401 Unauthorized error is encountered, the interceptor redirects
 * the user to the login page using the Router service.
 *
 * @param {HttpRequest} req - The outgoing HTTP request to be intercepted.
 * @param {HttpHandler} next - The next handler in the HTTP request chain.
 * @returns {Observable<HttpEvent>} The transformed HTTP request or response, or an error observable in case of an error.
 */
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Injection des services nécessaires
  const router = inject(Router);
  const token = sessionStorage.getItem('app.token');

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigateByUrl('login');
      }
      return throwError(() => error);
    })
  );
};
