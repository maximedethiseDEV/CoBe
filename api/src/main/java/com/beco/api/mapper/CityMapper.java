package com.beco.api.mapper;

import com.beco.api.model.dto.CityDto;
import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Country;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {

    @Mapping(source = "country", target = "countryId")
    CityDto toDto(City city);

    @Mapping(source = "countryId", target = "country")
    City toEntity(CityDto cityDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
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
        country.setId(countryId);
        return country;
    }


    /**
     * Convertit une entité Country en UUID
     * @param country l'entité Country à convertir
     * @return l'UUID de l'entité Country, ou null si country est null
     */
    default UUID map(Country country) {
        if (country == null) {
            return null;
        }
        return country.getId();
    }

}