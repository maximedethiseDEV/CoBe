import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const ContactResolver: ResolveFn<Contact> = (route: ActivatedRouteSnapshot): Observable<Contact> => {
    const contactProvider: ContactProvider = inject(ContactProvider);
    return contactProvider.get(route.params['entityId']);
};

export const ContactsResolver: ResolveFn<Contact[]> = (): Observable<Contact[]> => {
    const contactProvider: ContactProvider = inject(ContactProvider);
    return contactProvider.getAll().pipe(
        map((response: Pagination<Contact>) => response.content)
    );
}

export const ContactsNoPageResolver: ResolveFn<Contact[]> = (): Observable<Contact[]> => {
    const contactProvider: ContactProvider = inject(ContactProvider);
    return contactProvider.getAllNoPage();
};
