import { Pipe, PipeTransform } from '@angular/core';
import { City, Country } from '@core/models';

@Pipe({
    name: 'cityDisplay',
})
export class SelectCityFromAddressPipe implements PipeTransform {

    transform(city: City, countries: Country[]): string {
        if (!city || !countries) return '';

        const country = countries.find(country => country.id === city.countryId);
        const code = country?.countryCode;

        return `${city.cityName} ${city.postalCode} (${code})`;
    }
}
