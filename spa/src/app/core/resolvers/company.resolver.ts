import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Company} from '@core/models';
import {CompanyProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const CompanyResolver: ResolveFn<Company> = (route: ActivatedRouteSnapshot): Observable<Company> => {
    const companyProvider: CompanyProvider = inject(CompanyProvider);
    return companyProvider.get(route.params['entityId']);
};

export const CompaniesResolver: ResolveFn<Company[]> = (): Observable<Company[]> => {
    const companyProvider: CompanyProvider = inject(CompanyProvider);
    return companyProvider.getAll().pipe(
        map((response: Pagination<Company>) => response.content)
    );
}
