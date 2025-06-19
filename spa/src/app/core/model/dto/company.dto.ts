import { ContactDto } from './contact.dto';
import { SharedDetailsDto } from './shared-details.dto';
import {GetAddressDto} from './get-address.dto';

export interface CompanyDto {
  companyId: string;
  companyName: string;
  commerciallyActive: boolean;
  primaryContact: ContactDto;
  address: GetAddressDto;
  sharedDetails: SharedDetailsDto;
  createdDate: string;
  lastModifiedDate: string;
}
