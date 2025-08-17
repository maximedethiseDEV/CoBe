package com.cobe.api.mapper;

import com.cobe.api.model.dto.AddressDto;
import com.cobe.api.model.dto.PostAddressDto;
import com.cobe.api.model.entity.Address;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface AddressMapper {

    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.cityName", target = "cityName")
    @Mapping(source = "city.postalCode", target = "postalCode")
    @Mapping(source = "city.country.countryCode", target = "countryCode")
    AddressDto toDto(Address entity);

    @Mapping(source = "cityId", target = "city.id")
    Address toEntity(PostAddressDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAddressFromDto(PostAddressDto dto, @MappingTarget Address address);
}