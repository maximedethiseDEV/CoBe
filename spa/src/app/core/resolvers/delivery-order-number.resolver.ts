import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {DeliveryOrderNumber} from '@core/models';
import {DeliveryOrderNumberProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const DeliveryOrderNumberResolver: ResolveFn<DeliveryOrderNumber> = (route: ActivatedRouteSnapshot): Observable<DeliveryOrderNumber> => {
    const deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    return deliveryOrderNumberProvider.get(route.params['entityId']);
};

export const DeliveryOrderNumbersResolver: ResolveFn<DeliveryOrderNumber[]> = (): Observable<DeliveryOrderNumber[]> => {
    const deliveryOrderNumberProvider: DeliveryOrderNumberProvider = inject(DeliveryOrderNumberProvider);
    return deliveryOrderNumberProvider.getAll().pipe(
        map((response: Pagination<DeliveryOrderNumber>) => response.content)
    );
}
