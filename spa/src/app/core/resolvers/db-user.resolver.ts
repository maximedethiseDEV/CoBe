import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {DbUser} from '@core/models';
import {DbUserProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const DbUserResolver: ResolveFn<DbUser> = (route: ActivatedRouteSnapshot): Observable<DbUser> => {
    const dbUserProvider: DbUserProvider = inject(DbUserProvider);
    return dbUserProvider.get(route.params['entityId']);
};

export const DbUsersResolver: ResolveFn<DbUser[]> = (): Observable<DbUser[]> => {
    const dbUserProvider: DbUserProvider = inject(DbUserProvider);
    return dbUserProvider.getAll().pipe(
        map((response: Pagination<DbUser>) => response.content)
    );
}

export const DbUsersNoPageResolver: ResolveFn<DbUser[]> = (): Observable<DbUser[]> => {
    const dbUserProvider: DbUserProvider = inject(DbUserProvider);
    return dbUserProvider.getAllNoPage();
};
