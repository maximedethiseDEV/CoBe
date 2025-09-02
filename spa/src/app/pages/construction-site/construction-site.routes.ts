import {Routes} from '@angular/router';
import {
    AddressesNoPageResolver,
    AddressesResolver,
    CompaniesResolver, ContactsNoPageResolver, ContactsResolver,
    CustomersNoPageResolver, CustomersResolver, SharedAllDetailsNoPageResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {ConstructionSiteResolver} from '@core/resolvers/construction-site.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const constructionSiteRoutes: Routes = [
    {
        path: 'construction-sites',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'construction-sites')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/construction-site/components/construction-site-table/construction-site-table.component').then(component => component.ConstructionSiteTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/construction-site/components/construction-site-create/construction-site-create.component').then(component => component.ConstructionSiteCreateComponent),
                resolve: {
                    customers: CustomersNoPageResolver,
                    addresses: AddressesNoPageResolver,
                    contacts: ContactsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/construction-site/components/construction-site-update/construction-site-update.component').then(component => component.ConstructionSiteUpdateComponent),
                resolve: {
                    entity: ConstructionSiteResolver,
                    customers: CustomersNoPageResolver,
                    addresses: AddressesNoPageResolver,
                    contacts: ContactsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            }
        ]
    }
];
