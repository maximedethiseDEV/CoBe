import {Routes} from '@angular/router';
import {CityResolver, ContactsNoPageResolver, CountriesResolver} from '@core/resolvers';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';
import {DbUserResolver} from '@core/resolvers/db-user.resolver';
import {DbUserCreateComponent} from '@pages/db-user/components/db-user-create/db-user-create.component';

export const dbUserRoutes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'cities')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/db-user/components/db-user-table/db-user-table.component').then(component => component.DbUserTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/db-user/components/db-user-create/db-user-create.component').then(component => component.DbUserCreateComponent),
                resolve: {
                    contacts: ContactsNoPageResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/db-user/components/db-user-update/db-user-update.component').then(component => component.DbUserUpdateComponent),
                resolve: {
                    entity: DbUserResolver,
                    contacts: ContactsNoPageResolver
                }
            }
        ]
    }
];
