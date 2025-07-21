package com.beco.api.mapper;

import com.beco.api.model.dto.CityDto;
import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Country;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(source = "country.id", target = "countryId")
    CityDto toDto(City city);

    @Mapping(source = "countryId", target = "country.id")
    City toEntity(CityDto cityDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCityFromDto(CityDto dto, @MappingTarget City city);
}