import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Address, Contact} from '@core/models';
import {AddressProvider, ContactProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const AddressResolver: ResolveFn<Address> = (route: ActivatedRouteSnapshot): Observable<Address> => {
    const addressProvider: AddressProvider = inject(AddressProvider);
    return addressProvider.get(route.params['entityId']);
};

export const AddressesResolver: ResolveFn<Address[]> = (): Observable<Address[]> => {
    const addressProvider: AddressProvider = inject(AddressProvider);
    return addressProvider.getAll().pipe(
        map((response: Pagination<Address>) => response.content)
    );
}

export const AddressesNoPageResolver: ResolveFn<Address[]> = (): Observable<Address[]> => {
    const addressProvider: AddressProvider = inject(AddressProvider);
    return addressProvider.getAllNoPage();
};
