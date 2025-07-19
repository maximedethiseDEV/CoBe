package com.beco.api.mapper;

import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.City;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface AddressMapper {

    @Mapping(source = "city.cityName", target = "cityName")
    @Mapping(source = "city.country.countryCode" , target = "countryCode")
    GetAddressDto toDto(Address entity);

    @Mapping(source = "cityId", target = "city")
    Address toEntity(PostAddressDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAddressFromDto(PostAddressDto dto, @MappingTarget Address address);

    /**
     * Convertit un UUID en entité City
     * @param cityId l'identifiant de la ville
     * @return une nouvelle instance de City avec l'ID spécifié, ou null si l'ID est null
     */
    default City map(UUID cityId) {
        if (cityId == null) {
            return null;
        }
        City city = new City();
        city.setId(cityId);
        return city;
    }

}