import { CompanyDto } from './company.dto';
import { ContactDto } from './contact.dto';
import { SharedDetailsDto } from './shared-details.dto';

export interface CustomerDto {
  customerId: string;
  company: CompanyDto;
  contact: ContactDto;
  sharedDetails: SharedDetailsDto;
  dateStart: string; // yyyy-MM-dd
  dateEnd: string;
  isSolvent: boolean;
  parent?: CustomerDto; // récursif, facultatif
  createdDate: string;
  lastModifiedDate: string;
}
