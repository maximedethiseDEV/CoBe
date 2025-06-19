import { CompanyDto } from './company.dto';

export interface TransportSupplierDto {
  transportSupplierId: string;
  company: CompanyDto;
  licenseNumber: string;
  createdDate: string;
  lastModifiedDate: string;
}
