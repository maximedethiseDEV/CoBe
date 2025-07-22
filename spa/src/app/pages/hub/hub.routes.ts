import {Routes} from '@angular/router';
import {AuthenticationGuard} from '@core/guards';
import {contactRoutes} from '@pages/contact/contact.routes';
import {countryRoutes} from '@pages/country/country.routes';
import {cityRoutes} from '@pages/city/city.routes';

export const hubRoutes: Routes = [
    {
        path: 'hub',
        loadComponent: () => import('./hub.component').then(component => component.HubComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role: 'USER'
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                title: 'Tableau de bord',
                loadComponent: () => import('../dashboard/dashboard.component').then(component => component.DashboardComponent)
            },
            ...contactRoutes,
            ...countryRoutes,
            ...cityRoutes
        ]
    }
];
