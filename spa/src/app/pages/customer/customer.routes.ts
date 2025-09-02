import {Routes} from '@angular/router';
import {
    CompaniesNoPageResolver,
    CompaniesResolver, ContactsNoPageResolver, SharedAllDetailsNoPageResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {CustomerResolver} from '@core/resolvers/customer.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const customerRoutes: Routes = [
    {
        path: 'customers',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'customers')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/customer/components/customer-table/customer-table.component').then(component => component.CustomerTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/customer/components/customer-create/customer-create.component').then(component => component.CustomerCreateComponent),
                resolve: {
                    companies: CompaniesNoPageResolver,
                    contacts: ContactsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/customer/components/customer-update/customer-update.component').then(component => component.CustomerUpdateComponent),
                resolve: {
                    entity: CustomerResolver,
                    companies: CompaniesNoPageResolver,
                    contacts: ContactsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            }
        ]
    }
];
