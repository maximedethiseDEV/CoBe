import {Routes} from '@angular/router';
import {
    AddressesResolver, ContactsResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {CompanyResolver} from '@core/resolvers/company.resolver';

export const companyRoutes: Routes = [
    {
        path: 'companies',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
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
                }
            }
        ]
    }
];
