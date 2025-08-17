import {Routes} from '@angular/router';
import {
    AddressesResolver, CompaniesResolver, ContactsResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {CompanyResolver} from '@core/resolvers/company.resolver';
import {AuthenticationGuard} from '@core/guards';

export const companyRoutes: Routes = [
    {
        path: 'companies',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role: ['ADMIN']
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/company/components/company-table/company-table.component').then(component => component.CompanyTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/company/components/company-create/company-create.component').then(component => component.CompanyCreateComponent),
                resolve: {
                    contacts: ContactsResolver,
                    addresses: AddressesResolver,
                    sharedDetails: SharedAllDetailsResolver,
                    companies: CompaniesResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/company/components/company-update/company-update.component').then(component => component.CompanyUpdateComponent),
                resolve: {
                    entity: CompanyResolver,
                    contacts: ContactsResolver,
                    addresses: AddressesResolver,
                    sharedDetails: SharedAllDetailsResolver,
                    companies: CompaniesResolver
                }
            }
        ]
    }
];
