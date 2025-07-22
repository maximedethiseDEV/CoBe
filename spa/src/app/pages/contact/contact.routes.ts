import {Routes} from '@angular/router';
import {ContactResolver} from '@core/resolvers';

export const contactRoutes: Routes = [
    {
        path: 'contacts',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/contact-table/contact-table.component').then(component => component.ContactTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./components/contact-create/contact-create.component').then(component => component.ContactCreateComponent)
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('./components/contact-update/contact-update.component').then(component => component.ContactUpdateComponent),
                resolve: {
                    entity: ContactResolver
                }
            }
        ]
    }
];
