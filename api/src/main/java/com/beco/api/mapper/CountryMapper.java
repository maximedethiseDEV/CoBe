package com.beco.api.mapper;

import com.beco.api.model.dto.CountryDto;
import com.beco.api.model.entity.Country;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CountryMapper {

    @Mapping(target = "countryId", ignore = true)
    @Mapping(target = "countryCode", source = "countryCode")
    @Mapping(target = "countryName", source = "countryName")
    Country toEntity(CountryDto dto);

    @Mapping(target = "countryCode", source = "countryCode")
    @Mapping(target = "countryName", source = "countryName")
    CountryDto toDto(Country entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "countryId", ignore = true)
    void updateCountryFromDto(CountryDto dto, @MappingTarget Country country);
}