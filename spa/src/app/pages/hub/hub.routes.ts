import {Routes} from '@angular/router';
import {AuthenticationGuard} from '@core/guards';
import {contactRoutes} from '@pages/contact/contact.routes';
import {countryRoutes} from '@pages/country/country.routes';
import {cityRoutes} from '@pages/city/city.routes';
import {addressRoutes} from '@pages/address/address.routes';
import {sharedDetailsRoutes} from '@pages/shared-details/shared-details.routes';
import {companyRoutes} from '@pages/company/company.routes';

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
            ...cityRoutes,
            ...addressRoutes,
            ...sharedDetailsRoutes,
            ...companyRoutes,
        ]
    }
];
