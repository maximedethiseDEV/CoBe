package com.cobe.api.mapper;

import com.cobe.api.model.dto.CountryDto;
import com.cobe.api.model.entity.Country;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CountryMapper {

    CountryDto toDto(Country entity);

    Country toEntity(CountryDto dto);

    void updateCountryFromDto(CountryDto dto, @MappingTarget Country country);
}