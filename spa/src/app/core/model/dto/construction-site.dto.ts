import { CustomerDto } from './customer.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {GetAddressDto} from './get-address.dto';

export interface ConstructionSiteDto {
  constructionSiteId: string;
  constructionSiteCustomer: CustomerDto;
  constructionSiteAddress: GetAddressDto;
  sharedDetails: SharedDetailsDto;
  dateStart: string; // yyyy-MM-dd
  dateEnd: string;   // yyyy-MM-dd
  createdDate: string;
  lastModifiedDate: string;
}
