import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';
import {Pagination} from '@core/types';
import {map} from 'rxjs/operators';

export const CityResolver: ResolveFn<City> = (route: ActivatedRouteSnapshot): Observable<City> => {
    const cityProvider: CityProvider = inject(CityProvider);
    return cityProvider.get(route.params['entityId']);
};

export const CitiesResolver: ResolveFn<City[]> = (): Observable<City[]> => {
    const cityProvider: CityProvider = inject(CityProvider);
    return cityProvider.getAll().pipe(
        map((response: Pagination<City>) => response.content)
    );
}
