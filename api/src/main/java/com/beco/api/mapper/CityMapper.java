package com.beco.api.mapper;

import com.beco.api.model.dto.CityDto;
import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Country;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(target = "countryId", source = "country.countryId")
    CityDto toDto(City city);

    @Mapping(target = "country", source = "countryId")
    City toEntity(CityDto cityDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "cityId", ignore = true)
    void updateCityFromDto(CityDto dto, @MappingTarget City city);

    /**
     * Convertit un UUID en entité Country
     * @param countryId l'identifiant du pays
     * @return une nouvelle instance de Country avec l'ID spécifié, ou null si l'ID est null
     */
    default Country map(UUID countryId) {
        if (countryId == null) {
            return null;
        }
        Country country = new Country();
        country.setCountryId(countryId);
        return country;
    }

}