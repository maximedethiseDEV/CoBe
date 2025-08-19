import {Routes} from '@angular/router';
import {
    AddressesResolver,
    CompaniesResolver, ContactsResolver, SharedAllDetailsResolver,
} from '@core/resolvers';
import {MaterialSupplierResolver} from '@core/resolvers/material-supplier.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const materialSupplierRoutes: Routes = [
    {
        path: 'material-suppliers',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'material-suppliers')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/material-supplier/components/material-supplier-table/material-supplier-table.component').then(component => component.MaterialSupplierTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/material-supplier/components/material-supplier-create/material-supplier-create.component').then(component => component.MaterialSupplierCreateComponent),
                resolve: {
                    companies: CompaniesResolver,
                    addresses: AddressesResolver,
                    contacts: ContactsResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/material-supplier/components/material-supplier-update/material-supplier-update.component').then(component => component.MaterialSupplierUpdateComponent),
                resolve: {
                    entity: MaterialSupplierResolver,
                    companies: CompaniesResolver,
                    addresses: AddressesResolver,
                    contacts: ContactsResolver,
                    sharedDetails: SharedAllDetailsResolver,
                }
            }
        ]
    }
];
