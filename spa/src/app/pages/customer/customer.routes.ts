import {Routes} from '@angular/router';
import {
    CompaniesResolver, ContactsResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {CustomerResolver} from '@core/resolvers/customer.resolver';

export const customerRoutes: Routes = [
    {
        path: 'customers',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        data: {
            role: ['ADMIN']
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
                    companies: CompaniesResolver,
                    contacts: ContactsResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/customer/components/customer-update/customer-update.component').then(component => component.CustomerUpdateComponent),
                resolve: {
                    entity: CustomerResolver,
                    companies: CompaniesResolver,
                    contacts: ContactsResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            }
        ]
    }
];
