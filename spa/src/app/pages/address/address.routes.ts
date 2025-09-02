import {Routes} from '@angular/router';
import {CitiesResolver, CountriesResolver} from '@core/resolvers';
import {AddressResolver} from '@core/resolvers/address.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const addressRoutes: Routes = [
    {
        path: 'addresses',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'addresses')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/address/components/address-table/address-table.component').then(component => component.AddressTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/address/components/address-create/address-create.component').then(component => component.AddressCreateComponent),
                resolve: {
                    cities: CitiesResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/address/components/address-update/address-update.component').then(component => component.AddressUpdateComponent),
                resolve: {
                    entity: AddressResolver,
                    cities: CitiesResolver
                }
            }
        ]
    }
];
