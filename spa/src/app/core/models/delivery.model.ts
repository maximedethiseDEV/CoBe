import {EntityModel} from '@core/models/entity.model';

export interface Delivery extends EntityModel {
    actualDeliveryBegin: string;
    actualDeliveryEnd: string;
    quantity: number;

    statusId: string;

    orderId: string;

    transportSupplierId: string;

    deliveryOrderNumberId: string;
}
