import { MaterialSupplierDto } from './material-supplier.dto';
import { SharedDetailsDto } from './shared-details.dto';

export interface ProductDto {
  productId: string;
  productCode: string;
  materialSupplier: MaterialSupplierDto;
  sharedDetails: SharedDetailsDto;
  createdDate: string;
  lastModifiedDate: string;
}
