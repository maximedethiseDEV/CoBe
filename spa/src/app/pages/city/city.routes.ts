import {Routes} from '@angular/router';
import {CityResolver, CountriesResolver} from '@core/resolvers';
import {AuthenticationGuard} from '@core/guards';

export const cityRoutes: Routes = [
    {
        path: 'cities',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role: ['ADMIN']
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./components/city-table/city-table.component').then(component => component.CityTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./components/city-create/city-create.component').then(component => component.CityCreateComponent),
                resolve: {
                    countries: CountriesResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('./components/city-update/city-update.component').then(component => component.CityUpdateComponent),
                resolve: {
                    entity: CityResolver,
                    countries: CountriesResolver
                }
            }
        ]
    }
];
