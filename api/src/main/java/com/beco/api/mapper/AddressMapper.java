package com.beco.api.mapper;

import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface AddressMapper {

    @Mapping(target = "addressId", source = "addressId")
    @Mapping(target = "street", source = "street")
    @Mapping(target = "cityName", source = "city.cityName")
    @Mapping(target = "countryCode", source = "city.country.countryCode")
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    GetAddressDto toDto(Address entity);

    @Mapping(target = "addressId", ignore = true)
    @Mapping(target = "street", source = "street")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    Address toEntity(PostAddressDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "addressId", ignore = true)
    void updateAddressFromDto(PostAddressDto dto, @MappingTarget Address address);
}