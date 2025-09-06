package com.cobe.api.mapper;

import com.cobe.api.model.dto.CityDto;
import com.cobe.api.model.dto.PostCityDto;
import com.cobe.api.model.entity.City;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.countryCode", target = "countryCode")
    CityDto toDto(City entity);

    @Mapping(source = "countryId", target = "country.id")
    City toEntity(PostCityDto dto);

    @Mapping(source = "countryId", target = "country.id")
    void updateCityFromDto(PostCityDto dto, @MappingTarget City city);
}