package com.beco.api.mapper;

import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.City;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    @Mapping(target = "addressId", ignore = true)
    @Mapping(target = "city", source = "cityId", qualifiedByName = "cityFromId")
    @Mapping(target = "street", source = "street")
    Address toEntity(PostAddressDto dto);

    @Mapping(target = "addressId", source = "addressId")
    @Mapping(target = "cityName", source = "city.cityName")
    @Mapping(target = "street", source = "street")
    GetAddressDto toDto(Address entity);

    /** Met à jour une entité Address existante depuis un addressDto sans écraser les champs null **/
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "addressId", ignore = true)
    void updateAddressFromDto(PostAddressDto dto, @MappingTarget Address address);

    @Named("cityFromId")
    default City cityFromId(Integer id) {
        if (id == null) {
            return null;
        }
        City city = new City();
        city.setCityId(id);
        return city;
    }
}