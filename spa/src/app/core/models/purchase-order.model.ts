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
        codeAS400: string;
        codeSAP: string;
        nameShort: string;
        nameLong: string;
        category: string;
        isValid: boolean;
        materialSupplierName: string;

    sharedDetailsId: string;
}
