import {Routes} from '@angular/router';
import {CountryResolver} from '@core/resolvers';

export const countryRoutes: Routes = [
    {
        path: 'countries',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/country-table/country-table.component').then(component => component.CountryTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./components/country-create/country-create.component').then(component => component.CountryCreateComponent)
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('./components/country-update/country-update.component').then(component => component.CountryUpdateComponent),
                resolve: {
                    entity: CountryResolver
                }
            }
        ]
    }
];
