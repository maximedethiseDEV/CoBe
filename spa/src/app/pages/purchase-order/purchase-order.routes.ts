import {Routes} from '@angular/router';
import {
    ConstructionSitesResolver,
    CustomersResolver,
    SharedAllDetailsResolver,
    ProductsResolver, CustomersNoPageResolver, ConstructionSitesNoPageResolver, ProductsNoPageResolver,
    SharedAllDetailsNoPageResolver
} from '@core/resolvers';
import {PurchaseOrderResolver} from '@core/resolvers/purchase-order.resolver';
import {AuthenticationGuard} from '@core/guards';
import {MenuList} from '@core/lists';

export const purchaseOrderRoutes: Routes = [
    {
        path: 'purchase-orders',
        canActivate: [AuthenticationGuard],
        data: {
            role:  MenuList
                .flatMap(item => item.children ?? [])
                .find(child => child.link === 'purchase-orders')?.role ?? []
        },
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
                    customers: CustomersNoPageResolver,
                    constructionSites: ConstructionSitesNoPageResolver,
                    products: ProductsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/purchase-order/components/purchase-order-update/purchase-order-update.component').then(component => component.PurchaseOrderUpdateComponent),
                resolve: {
                    entity: PurchaseOrderResolver,
                    customers: CustomersNoPageResolver,
                    constructionSites: ConstructionSitesNoPageResolver,
                    products: ProductsNoPageResolver,
                    sharedDetails: SharedAllDetailsNoPageResolver
                }
            }
        ]
    }
];
