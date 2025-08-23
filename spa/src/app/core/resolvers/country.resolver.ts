import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {map, Observable} from 'rxjs';
import {Contact, Country} from '@core/models';
import {ContactProvider, CountryProvider} from '@core/providers';
import {Pagination} from '@core/types';

export const CountryResolver: ResolveFn<Country> = (route: ActivatedRouteSnapshot): Observable<Country> => {
    const countryProvider: CountryProvider = inject(CountryProvider);
    return countryProvider.get(route.params['entityId']);
};

export const CountriesResolver: ResolveFn<Country[]> = (): Observable<Country[]> => {
    const countryProvider: CountryProvider = inject(CountryProvider);
    return countryProvider.getAll().pipe(
        map((response: Pagination<Country>)=> response.content)
    );
};

export const CountriesNoPageResolver: ResolveFn<Country[]> = (): Observable<Country[]> => {
    const countryProvider: CountryProvider = inject(CountryProvider);
    return countryProvider.getAllNoPage();
};
