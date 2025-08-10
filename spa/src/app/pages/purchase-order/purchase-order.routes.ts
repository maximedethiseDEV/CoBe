import {Routes} from '@angular/router';
import {
    ConstructionSitesResolver,
    CustomersResolver,
    SharedAllDetailsResolver,
    ProductsResolver
} from '@core/resolvers';
import {PurchaseOrderResolver} from '@core/resolvers/purchase-order.resolver';

export const purchaseOrderRoutes: Routes = [
    {
        path: 'purchase-orders',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/purchase-order/components/purchase-order-table/purchase-order-table.component').then(component => component.PurchaseOrderTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/purchase-order/components/purchase-order-create/purchase-order-create.component').then(component => component.PurchaseOrderCreateComponent),
                resolve: {
                    customers: CustomersResolver,
                    constructionSites: ConstructionSitesResolver,
                    products: ProductsResolver,
                    sharedDetails: SharedAllDetailsResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/purchase-order/components/purchase-order-update/purchase-order-update.component').then(component => component.PurchaseOrderUpdateComponent),
                resolve: {
                    entity: PurchaseOrderResolver,
                    customers: CustomersResolver,
                    constructionSites: ConstructionSitesResolver,
                    products: ProductsResolver,
                    sharedDetails: SharedAllDetailsResolver
                }
            }
        ]
    }
];
