package com.beco.api.mapper;

import com.beco.api.model.dto.CountryDto;
import com.beco.api.model.entity.Country;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T22:42:20+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class CountryMapperImpl implements CountryMapper {

    @Override
    public Country toEntity(CountryDto dto) {
        if ( dto == null ) {
            return null;
        }

        Country country = new Country();

        country.setCountryCode( dto.getCountryCode() );
        country.setCountryName( dto.getCountryName() );

        return country;
    }

    @Override
    public CountryDto toDto(Country entity) {
        if ( entity == null ) {
            return null;
        }

        CountryDto countryDto = new CountryDto();

        countryDto.setCountryCode( entity.getCountryCode() );
        countryDto.setCountryName( entity.getCountryName() );
        countryDto.setCountryId( entity.getCountryId() );

        return countryDto;
    }

    @Override
    public void updateCountryFromDto(CountryDto dto, Country country) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCountryCode() != null ) {
            country.setCountryCode( dto.getCountryCode() );
        }
        if ( dto.getCountryName() != null ) {
            country.setCountryName( dto.getCountryName() );
        }
    }
}
