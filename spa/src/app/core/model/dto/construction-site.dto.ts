import { CustomerDto } from './customer.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {AddressDto} from './address.dto';

export interface ConstructionSiteDto {
  constructionSiteId: string;
  constructionSiteCustomer: CustomerDto;
  constructionSiteAddress: AddressDto;
  sharedDetails: SharedDetailsDto;
  dateStart: string; // yyyy-MM-dd
  dateEnd: string;   // yyyy-MM-dd
  createdDate: string;
  lastModifiedDate: string;
}
