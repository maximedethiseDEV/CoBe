import {EntityModel} from '@core/models/entity.model';

export interface DeliveryOrderNumber extends EntityModel {

    uniqueDeliveryOrderNumber: string;

    transportSupplierId: string;
    transportSupplierName: string;

    customerId: string;
    customerName: string;

    cityId: string;
    cityName: string;

    productId: string;
    code: string;
}
