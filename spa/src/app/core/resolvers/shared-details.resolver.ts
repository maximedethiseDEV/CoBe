import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {map, Observable} from 'rxjs';
import {Contact, SharedDetails} from '@core/models';
import {ContactProvider, SharedDetailsProvider} from '@core/providers';
import {Pagination} from '@core/types';

export const SharedDetailsResolver: ResolveFn<SharedDetails> = (route: ActivatedRouteSnapshot): Observable<SharedDetails> => {
    const sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    return sharedDetailsProvider.get(route.params['entityId']);
};

export const SharedAllDetailsResolver: ResolveFn<SharedDetails[]> = (): Observable<SharedDetails[]> => {
    const sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    return sharedDetailsProvider.getAll().pipe(
        map((response: Pagination<SharedDetails>)=> response.content)
    );
};

export const SharedAllDetailsNoPageResolver: ResolveFn<SharedDetails[]> = (): Observable<SharedDetails[]> => {
    const sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    return sharedDetailsProvider.getAllNoPage();
};
