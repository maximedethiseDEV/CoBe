import {Routes} from '@angular/router';
import {AuthenticationGuard} from '@core/guards';
import {contactRoutes} from '@pages/contact/contact.routes';
import {countryRoutes} from '@pages/country/country.routes';
import {cityRoutes} from '@pages/city/city.routes';
import {addressRoutes} from '@pages/address/address.routes';
import {sharedDetailsRoutes} from '@pages/shared-details/shared-details.routes';
import {companyRoutes} from '@pages/company/company.routes';
import {customerRoutes} from '@pages/customer/customer.routes';
import {materialSupplierRoutes} from '@pages/material-supplier/material-supplier.routes';
import {constructionSiteRoutes} from '@pages/construction-site/construction-site.routes';
import {productRoutes} from '@pages/product/product.routes';
import {transportSupplierRoutes} from '@pages/transport-supplier/transport-supplier.routes';
import {deliveryOrderNumberRoutes} from '@pages/delivery-order-number/delivery-order-number.routes';
import {purchaseOrderRoutes} from '@pages/purchase-order/purchase-order.routes';
import {deliveryRoutes} from '@pages/delivery/delivery.routes';

export const hubRoutes: Routes = [
    {
        path: 'hub',
        loadComponent: () => import('./hub.component').then(component => component.HubComponent),
        canActivate: [AuthenticationGuard],
        data: {
            role: 'USER'
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                title: 'Tableau de bord',
                loadComponent: () => import('../dashboard/dashboard.component').then(component => component.DashboardComponent)
            },
            ...contactRoutes,
            ...countryRoutes,
            ...cityRoutes,
            ...addressRoutes,
            ...sharedDetailsRoutes,
            ...companyRoutes,
            ...customerRoutes,
            ...materialSupplierRoutes,
            ...constructionSiteRoutes,
            ...productRoutes,
            ...transportSupplierRoutes,
            ...deliveryOrderNumberRoutes,
            ...purchaseOrderRoutes,
            ...deliveryRoutes
        ]
    }
];
