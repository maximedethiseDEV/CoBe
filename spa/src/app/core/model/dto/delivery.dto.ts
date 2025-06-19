import { OrderDto } from './order.dto';
import { TransportSupplierDto } from './transport-supplier.dto';
import { DeliveryOrderNumberDto } from './delivery-order-number.dto';
import { DeliveryStatusDto } from './delivery-status.dto';

export interface DeliveryDto {
  deliveryId: string;
  order: OrderDto;
  transportSupplier: TransportSupplierDto;
  deliveryOrderNumber: DeliveryOrderNumberDto;
  actualDeliveryDate: string; // yyyy-MM-dd
  actualDeliveryTime: string; // HH:mm:ss
  quantity: number;
  status: DeliveryStatusDto;
  createdDate: string;
  lastModifiedDate: string;
}
