import {CustomerDto} from './customer.dto';
import {GetAddressDto} from './get-address.dto';
import {ProductDto} from './product.dto';
import {SharedDetailsDto} from './shared-details.dto';
import {ConstructionSiteDto} from './construction-site.dto';

export interface OrderDto {
  orderId: string;
  billingCustomer: CustomerDto;
  deliveryCustomer?: CustomerDto;
  constructionSite?: ConstructionSiteDto;
  quantityOrdered: number;
  requestedDeliveryDate: string; // ou Date si tu veux convertir manuellement
  requestedDeliveryTime: string; // à voir selon comment c’est sérialisé
  product: ProductDto;
  sharedDetails?: SharedDetailsDto;
  createdDate?: string; // ou Date si tu convertis
  lastModifiedDate?: string; // ou Date
}
