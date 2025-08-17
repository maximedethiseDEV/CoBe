import {EntityModel} from '@core/models/entity.model';

export interface PurchaseOrder extends EntityModel {

    requestedDeliveryBegin: string;
    requestedDeliveryEnd: string;
    quantityOrdered: number;

    customerId: string;
        customerName: string;

    constructionSiteId: string;
        constructionSiteCustomerName: string;
        constructionSiteStreet: string;
        constructionSiteCityName: string;
        constructionSitePostalCode: string;
        constructionSiteCountryCode: string;

    productId: string;
        code: string;
        name: string;
        materialSupplierName: string;

    sharedDetailsId: string;
}
