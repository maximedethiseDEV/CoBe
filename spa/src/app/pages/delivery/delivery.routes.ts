import {Routes} from '@angular/router';
import {
    ConstructionSitesResolver,
    CustomersResolver,
    SharedAllDetailsResolver,
    ProductsResolver, PurchaseOrdersResolver, DeliveriesResolver, DeliveryAllStatusResolver
} from '@core/resolvers';
import {DeliveryResolver} from '@core/resolvers/delivery.resolver';

export const deliveryRoutes: Routes = [
    {
        path: 'deliveries',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
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
                    transportSuppliers: ProductsResolver,
                    deliveryOrderNumbers: SharedAllDetailsResolver,
                    deliveryStatus: DeliveryAllStatusResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/delivery/components/delivery-update/delivery-update.component').then(component => component.DeliveryUpdateComponent),
                resolve: {
                    entity: DeliveryResolver,
                    purchaseOrders: PurchaseOrdersResolver,
                    transportSuppliers: ProductsResolver,
                    deliveryOrderNumbers: SharedAllDetailsResolver,
                    deliveryStatus: DeliveryAllStatusResolver
                }
            }
        ]
    }
];
