import {Routes} from '@angular/router';
import {
    SharedAllDetailsResolver,
    PurchaseOrdersResolver,
    DeliveryAllStatusResolver,
    TransportSuppliersResolver, DeliveryOrderNumbersResolver
} from '@core/resolvers';
import {DeliveryResolver} from '@core/resolvers/delivery.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const deliveryRoutes: Routes = [
    {
        path: 'deliveries',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'deliveries')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/delivery/components/delivery-table/delivery-table.component').then(component => component.DeliveryTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/delivery/components/delivery-create/delivery-create.component').then(component => component.DeliveryCreateComponent),
                resolve: {
                    purchaseOrders: PurchaseOrdersResolver,
                    transportSuppliers: TransportSuppliersResolver,
                    deliveryOrderNumbers: DeliveryOrderNumbersResolver,
                    deliveryStatus: DeliveryAllStatusResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/delivery/components/delivery-update/delivery-update.component').then(component => component.DeliveryUpdateComponent),
                resolve: {
                    entity: DeliveryResolver,
                    purchaseOrders: PurchaseOrdersResolver,
                    transportSuppliers: TransportSuppliersResolver,
                    deliveryOrderNumbers: DeliveryOrderNumbersResolver,
                    deliveryStatus: DeliveryAllStatusResolver
                }
            }
        ]
    }
];
