import { CountryDto } from './country.dto';

export interface CityDto {
  cityId: string;
  postalCode: string;
  cityName: string;
  country: CountryDto;
}
