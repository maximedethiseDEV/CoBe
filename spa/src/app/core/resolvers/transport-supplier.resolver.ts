import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {TransportSupplier} from '@core/models';
import {TransportSupplierProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const TransportSupplierResolver: ResolveFn<TransportSupplier> = (route: ActivatedRouteSnapshot): Observable<TransportSupplier> => {
    const transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    return transportSupplierProvider.get(route.params['entityId']);
};

export const TransportSuppliersResolver: ResolveFn<TransportSupplier[]> = (): Observable<TransportSupplier[]> => {
    const transportSupplierProvider: TransportSupplierProvider = inject(TransportSupplierProvider);
    return transportSupplierProvider.getAll().pipe(
        map((response: Pagination<TransportSupplier>) => response.content)
    );
}
