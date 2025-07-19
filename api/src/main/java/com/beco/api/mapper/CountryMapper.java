package com.beco.api.mapper;

import com.beco.api.model.dto.CountryDto;
import com.beco.api.model.entity.Country;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CountryMapper {

    CountryDto toDto(Country entity);

    Country toEntity(CountryDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCountryFromDto(CountryDto dto, @MappingTarget Country country);
}