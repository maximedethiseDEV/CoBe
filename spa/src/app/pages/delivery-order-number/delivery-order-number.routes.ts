import {Routes} from '@angular/router';
import {
    CitiesResolver,
    CustomersResolver,
    ProductsResolver,
    TransportSuppliersResolver,
} from '@core/resolvers';
import {DeliveryOrderNumberResolver} from '@core/resolvers/delivery-order-number.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const deliveryOrderNumberRoutes: Routes = [
    {
        path: 'delivery-order-numbers',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'delivery-order-numbers')?.role ?? []
        },
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/delivery-order-number/components/delivery-order-number-table/delivery-order-number-table.component').then(component => component.DeliveryOrderNumberTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/delivery-order-number/components/delivery-order-number-create/delivery-order-number-create.component').then(component => component.DeliveryOrderNumberCreateComponent),
                resolve: {
                    transportSuppliers: TransportSuppliersResolver,
                    customers: CustomersResolver,
                    cities: CitiesResolver,
                    products: ProductsResolver,
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/delivery-order-number/components/delivery-order-number-update/delivery-order-number-update.component').then(component => component.DeliveryOrderNumberUpdateComponent),
                resolve: {
                    entity: DeliveryOrderNumberResolver,
                    transportSuppliers: TransportSuppliersResolver,
                    customers: CustomersResolver,
                    cities: CitiesResolver,
                    products: ProductsResolver,
                }
            }
        ]
    }
];
