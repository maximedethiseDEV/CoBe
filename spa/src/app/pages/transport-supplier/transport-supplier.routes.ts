import {Routes} from '@angular/router';
import {CompaniesResolver, ContactsResolver} from '@core/resolvers';
import {TransportSupplierResolver} from '@core/resolvers/transport-supplier.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const transportSupplierRoutes: Routes = [
    {
        path: 'transport-suppliers',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'transport-suppliers')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/transport-supplier/components/transport-supplier-table/transport-supplier-table.component').then(component => component.TransportSupplierTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/transport-supplier/components/transport-supplier-create/transport-supplier-create.component').then(component => component.TransportSupplierCreateComponent),
                resolve: {
                    companies: CompaniesResolver,
                    contacts: ContactsResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/transport-supplier/components/transport-supplier-update/transport-supplier-update.component').then(component => component.TransportSupplierUpdateComponent),
                resolve: {
                    entity: TransportSupplierResolver,
                    companies: CompaniesResolver,
                    contacts: ContactsResolver
                }
            }
        ]
    }
];
