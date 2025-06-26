import { ContactDto } from './contact.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {AddressDto} from './address.dto';

export interface CompanyDto {
  companyId: string;
  companyName: string;
  commerciallyActive: boolean;
  primaryContact: ContactDto;
  address: AddressDto;
  sharedDetails: SharedDetailsDto;
  createdDate: string;
  lastModifiedDate: string;
}
