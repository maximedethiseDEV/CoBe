package com.beco.api.mapper;

import com.beco.api.model.dto.CityDto;
import com.beco.api.model.dto.PostCityDto;
import com.beco.api.model.entity.City;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.countryCode", target = "countryCode")
    CityDto toDto(City entity);

    @Mapping(source = "countryId", target = "country.id")
    City toEntity(PostCityDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCityFromDto(PostCityDto dto, @MappingTarget City city);
}