import { TransportSupplierDto } from './transport-supplier.dto';
import { CustomerDto } from './customer.dto';
import { CityDto } from './city.dto';
import { ProductDto } from './product.dto';

export interface DeliveryOrderNumberDto {
  deliveryOrderNumberId: string;
  transportSupplier: TransportSupplierDto;
  customer: CustomerDto;
  city: CityDto;
  product: ProductDto;
  uniqueDeliveryOrderNumber: string;
}
