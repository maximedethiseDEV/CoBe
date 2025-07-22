import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';

export const ContactResolver: ResolveFn<Contact> = (route: ActivatedRouteSnapshot): Observable<Contact> => {
    const contactProvider: ContactProvider = inject(ContactProvider);
    return contactProvider.get(route.params['entityId']);
};
