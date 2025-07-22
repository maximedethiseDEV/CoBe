import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {City} from '@core/models';
import {CityProvider} from '@core/providers';

export const CityResolver: ResolveFn<City> = (route: ActivatedRouteSnapshot): Observable<City> => {
    const cityProvider: CityProvider = inject(CityProvider);
    return cityProvider.get(route.params['entityId']);
};
