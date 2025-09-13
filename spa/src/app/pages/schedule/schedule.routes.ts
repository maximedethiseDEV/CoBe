import {Routes} from '@angular/router';
import {
    ConstructionSitesResolver,
    CustomersResolver,
    SharedAllDetailsResolver,
    ProductsResolver, CustomersNoPageResolver, ConstructionSitesNoPageResolver, ProductsNoPageResolver,
    SharedAllDetailsNoPageResolver, DeliveriesNoPageResolver, TransportSuppliersNoPageResolver
} from '@core/resolvers';
import {PurchaseOrderResolver} from '@core/resolvers/purchase-order.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const scheduleRoutes: Routes = [
    {
        path: 'schedule',
        canActivate: [AuthenticationGuard],
        data: {
            role: ['USER', 'ADMIN','SUPER_ADMIN']
        },
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/schedule/schedule/schedule.component').then(component => component.ScheduleComponent),
                resolve: {
                    deliveries: DeliveriesNoPageResolver,
                    transportSuppliers: TransportSuppliersNoPageResolver
                }
            }
        ]
    }
];
