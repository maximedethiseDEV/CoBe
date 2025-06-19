import { CompanyDto } from './company.dto';
import { ContactDto } from './contact.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {GetAddressDto} from './get-address.dto';

export interface MaterialSupplierDto {
  materialSupplierId: string;
  company: CompanyDto;
  contact: ContactDto;
  loadingAddress: GetAddressDto;
  sharedDetails: SharedDetailsDto;
  createdDate: string;
  lastModifiedDate: string;
}
