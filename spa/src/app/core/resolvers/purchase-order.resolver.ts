import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Company, PurchaseOrder} from '@core/models';
import {CompanyProvider, PurchaseOrderProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const PurchaseOrderResolver: ResolveFn<PurchaseOrder> = (route: ActivatedRouteSnapshot): Observable<PurchaseOrder> => {
    const purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    return purchaseOrderProvider.get(route.params['entityId']);
};

export const PurchaseOrdersResolver: ResolveFn<PurchaseOrder[]> = (): Observable<PurchaseOrder[]> => {
    const purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    return purchaseOrderProvider.getAll().pipe(
        map((response: Pagination<PurchaseOrder>) => response.content)
    );
}


export const PurchaseOrdersNoPageResolver: ResolveFn<PurchaseOrder[]> = (): Observable<PurchaseOrder[]> => {
    const purchaseOrderProvider: PurchaseOrderProvider = inject(PurchaseOrderProvider);
    return purchaseOrderProvider.getAllNoPage();
};
