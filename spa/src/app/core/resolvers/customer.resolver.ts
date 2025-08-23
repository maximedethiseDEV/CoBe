import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact, Customer} from '@core/models';
import {ContactProvider, CustomerProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const CustomerResolver: ResolveFn<Customer> = (route: ActivatedRouteSnapshot): Observable<Customer> => {
    const customerProvider: CustomerProvider = inject(CustomerProvider);
    return customerProvider.get(route.params['entityId']);
};

export const CustomersResolver: ResolveFn<Customer[]> = (): Observable<Customer[]> => {
    const customerProvider: CustomerProvider = inject(CustomerProvider);
    return customerProvider.getAll().pipe(
        map((response: Pagination<Customer>) => response.content)
    );
}

export const CustomersNoPageResolver: ResolveFn<Customer[]> = (): Observable<Customer[]> => {
    const customerProvider: CustomerProvider = inject(CustomerProvider);
    return customerProvider.getAllNoPage();
};
