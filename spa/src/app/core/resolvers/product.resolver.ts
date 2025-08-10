import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '@core/models';
import {ProductProvider} from '@core/providers';
import {map} from 'rxjs/operators';
import {Pagination} from '@core/types';

export const ProductResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot): Observable<Product> => {
    const productProvider: ProductProvider = inject(ProductProvider);
    return productProvider.get(route.params['entityId']);
};

export const ProductsResolver: ResolveFn<Product[]> = (): Observable<Product[]> => {
    const productProvider: ProductProvider = inject(ProductProvider);
    return productProvider.getAll().pipe(
        map((response: Pagination<Product>) => response.content)
    );
}
