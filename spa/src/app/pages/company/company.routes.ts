import {Routes} from '@angular/router';
import {
    AddressesNoPageResolver,
    AddressesResolver, CitiesNoPageResolver,
    CitiesResolver, CompaniesResolver, ContactsNoPageResolver, CountriesResolver,
    SharedAllDetailsNoPageResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {CompanyResolver} from '@core/resolvers/company.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const companyRoutes: Routes = [
    {
        path: 'companies',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'companies')?.role ?? []
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
                    addresses: AddressesNoPageResolver,
                    cities: CitiesNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/company/components/company-update/company-update.component').then(component => component.CompanyUpdateComponent),
                resolve: {
                    entity: CompanyResolver,
                    addresses: AddressesNoPageResolver,
                    cities: CitiesNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver,
                }
            }
        ]
    }
];
