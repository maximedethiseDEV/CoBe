import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Country} from '@core/models';
import {CountryProvider} from '@core/providers';

export const CountryResolver: ResolveFn<Country> = (route: ActivatedRouteSnapshot): Observable<Country> => {
    const countryProvider: CountryProvider = inject(CountryProvider);
    return countryProvider.get(route.params['entityId']);
};

export const CountriesResolver: ResolveFn<Country[]> = (): Observable<Country[]> => {
    const countryProvider: CountryProvider = inject(CountryProvider);
    return countryProvider.getAll();
};
