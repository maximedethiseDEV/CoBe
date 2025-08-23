import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact, Delivery} from '@core/models';
import {ContactProvider, DeliveryProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const DeliveryResolver: ResolveFn<Delivery> = (route: ActivatedRouteSnapshot): Observable<Delivery> => {
    const deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    return deliveryProvider.get(route.params['entityId']);
};

export const DeliveriesResolver: ResolveFn<Delivery[]> = (): Observable<Delivery[]> => {
    const deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    return deliveryProvider.getAll().pipe(
        map((response: Pagination<Delivery>) => response.content)
    );
}

export const DeliveriesNoPageResolver: ResolveFn<Delivery[]> = (): Observable<Delivery[]> => {
    const deliveryProvider: DeliveryProvider = inject(DeliveryProvider);
    return deliveryProvider.getAllNoPage();
};
