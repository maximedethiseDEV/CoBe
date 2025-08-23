import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {ConstructionSite, Contact} from '@core/models';
import {ConstructionSiteProvider, ContactProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const ConstructionSiteResolver: ResolveFn<ConstructionSite> = (route: ActivatedRouteSnapshot): Observable<ConstructionSite> => {
    const constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    return constructionSiteProvider.get(route.params['entityId']);
};

export const ConstructionSitesResolver: ResolveFn<ConstructionSite[]> = (): Observable<ConstructionSite[]> => {
    const constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    return constructionSiteProvider.getAll().pipe(
        map((response: Pagination<ConstructionSite>) => response.content)
    );
}

export const ConstructionSitesNoPageResolver: ResolveFn<ConstructionSite[]> = (): Observable<ConstructionSite[]> => {
    const constructionSiteProvider: ConstructionSiteProvider = inject(ConstructionSiteProvider);
    return constructionSiteProvider.getAllNoPage();
};
