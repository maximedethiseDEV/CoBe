import {Routes} from '@angular/router';
import {
    AddressesResolver,
    CompaniesResolver, ContactsResolver, CustomersResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {ConstructionSiteResolver} from '@core/resolvers/construction-site.resolver';

export const constructionSiteRoutes: Routes = [
    {
        path: 'construction-sites',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/construction-site/components/construction-site-table/construction-site-table.component').then(component => component.ConstructionSiteTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/construction-site/components/construction-site-create/construction-site-create.component').then(component => component.ConstructionSiteCreateComponent),
                resolve: {
                    customers: CustomersResolver,
                    addresses: AddressesResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/construction-site/components/construction-site-update/construction-site-update.component').then(component => component.ConstructionSiteUpdateComponent),
                resolve: {
                    entity: ConstructionSiteResolver,
                    customers: CustomersResolver,
                    addresses: AddressesResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            }
        ]
    }
];
