package com.beco.api.mapper;

import com.beco.api.model.dto.CityDto;
import com.beco.api.model.entity.City;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(target = "cityId", source = "cityId")
    @Mapping(target = "postalCode", source = "postalCode")
    @Mapping(target = "cityName", source = "cityName")
    @Mapping(target = "country.countryId", source = "country.countryId")
    @Mapping(target = "country.countryName", source = "country.countryName")
    @Mapping(target = "country.countryCode", source = "country.countryCode")
    CityDto toDto(City city);

    @Mapping(target = "postalCode", source = "postalCode")
    @Mapping(target = "cityName", source = "cityName")
    @Mapping(target = "country", source = "country")
    City toEntity(CityDto cityDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "cityId", ignore = true)
    void updateCityFromDto(CityDto dto, @MappingTarget City city);
}