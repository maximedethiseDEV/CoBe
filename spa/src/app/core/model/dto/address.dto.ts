import {CityDto} from './city.dto';

export interface AddressDto {
  addressId?: string;
  city: CityDto;
  street: string;
  createdDate?: string;
  lastModifiedDate?: string;
}
