import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact, MaterialSupplier} from '@core/models';
import {ContactProvider, MaterialSupplierProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const MaterialSupplierResolver: ResolveFn<MaterialSupplier> = (route: ActivatedRouteSnapshot): Observable<MaterialSupplier> => {
    const materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    return materialSupplierProvider.get(route.params['entityId']);
};

export const MaterialSuppliersResolver: ResolveFn<MaterialSupplier[]> = (): Observable<MaterialSupplier[]> => {
    const materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    return materialSupplierProvider.getAll().pipe(
        map((response: Pagination<MaterialSupplier>) => response.content)
    );
}

export const MaterialSuppliersNoPageResolver: ResolveFn<MaterialSupplier[]> = (): Observable<MaterialSupplier[]> => {
    const materialSupplierProvider: MaterialSupplierProvider = inject(MaterialSupplierProvider);
    return materialSupplierProvider.getAllNoPage();
};
