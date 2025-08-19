import {Routes} from '@angular/router';
import {SharedDetailsResolver} from '@core/resolvers';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const sharedDetailsRoutes: Routes = [
    {
        path: 'shared-details',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'shared-details')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/shared-details/components/shared-details-table/shared-details-table.component').then(component => component.SharedDetailsTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/shared-details/components/shared-details-create/shared-details-create.component').then(component => component.SharedDetailsCreateComponent)
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/shared-details/components/shared-details-update/shared-details-update.component').then(component => component.SharedDetailsUpdateComponent),
                resolve: {
                    entity: SharedDetailsResolver
                }
            }
        ]
    }
];
