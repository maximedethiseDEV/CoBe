import {DeliveryStatus} from './delivery-status.model';
import {DeliveryOrderNumber} from './delivery-order-number.model';
import {TransportSupplier} from './transport-supplier.model';
import {Order} from './order.model';

export interface Delivery {
  deliveryId?: number;
  order: Order;
  transportSupplier: TransportSupplier;
  deliveryOrderNumber: DeliveryOrderNumber;
  actualDeliveryDate: string;
  actualDeliveryTime: string;
  quantity: number;
  status: DeliveryStatus;
}
