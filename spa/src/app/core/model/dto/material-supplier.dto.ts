import { CompanyDto } from './company.dto';
import { ContactDto } from './contact.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {AddressDto} from './address.dto';

export interface MaterialSupplierDto {
  materialSupplierId: string;
  company: CompanyDto;
  contact: ContactDto;
  loadingAddress: AddressDto;
  sharedDetails: SharedDetailsDto;
  createdDate: string;
  lastModifiedDate: string;
}
