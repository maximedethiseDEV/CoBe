import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {DeliveryStatus} from '@core/models';
import {DeliveryStatusProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const DeliveryStatusResolver: ResolveFn<DeliveryStatus> = (route: ActivatedRouteSnapshot): Observable<DeliveryStatus> => {
    const deliveryProvider: DeliveryStatusProvider = inject(DeliveryStatusProvider);
    return deliveryProvider.get(route.params['entityId']);
};

export const DeliveryAllStatusResolver: ResolveFn<DeliveryStatus[]> = (): Observable<DeliveryStatus[]> => {
    const deliveryProvider: DeliveryStatusProvider = inject(DeliveryStatusProvider);
    return deliveryProvider.getAll().pipe(
        map((response: Pagination<DeliveryStatus>) => response.content)
    );
}
