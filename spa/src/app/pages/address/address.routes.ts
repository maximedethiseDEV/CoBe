import {Routes} from '@angular/router';
import {CitiesResolver, CountriesResolver} from '@core/resolvers';
import {AddressResolver} from '@core/resolvers/address.resolver';

export const addressRoutes: Routes = [
    {
        path: 'addresses',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/address/components/address-table/address-table.component').then(component => component.AddressTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/address/components/address-create/address-create.component').then(component => component.AddressCreateComponent),
                resolve: {
                    countries: CountriesResolver,
                    cities: CitiesResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/address/components/address-update/address-update.component').then(component => component.AddressUpdateComponent),
                resolve: {
                    entity: AddressResolver,
                    countries: CountriesResolver,
                    cities: CitiesResolver
                }
            }
        ]
    }
];
