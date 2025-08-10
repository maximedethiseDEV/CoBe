import {Routes} from '@angular/router';
import {MaterialSuppliersResolver, SharedAllDetailsResolver, SharedDetailsResolver} from '@core/resolvers';
import {ProductResolver} from '@core/resolvers/product.resolver';

export const productRoutes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('@core/components/wrapper/wrapper.component').then(component => component.WrapperComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/product/components/product-table/product-table.component').then(component => component.ProductTableComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/product/components/product-create/product-create.component').then(component => component.ProductCreateComponent),
                resolve: {
                    materialSuppliers: MaterialSuppliersResolver,
                    sharedDetails: SharedAllDetailsResolver
                }
            },
            {
                path: 'update/:entityId',
                loadComponent: () => import('@pages/product/components/product-update/product-update.component').then(component => component.ProductUpdateComponent),
                resolve: {
                    entity: ProductResolver,
                    materialSuppliers: MaterialSuppliersResolver,
                    sharedDetails: SharedAllDetailsResolver
                }
            }
        ]
    }
];
