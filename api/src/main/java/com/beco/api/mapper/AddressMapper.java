package com.beco.api.mapper;

import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.City;
import com.beco.api.model.entity.City;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface AddressMapper {
    @Mapping(source = "city.id", target = "cityId")
    GetAddressDto toDto(Address entity);

    @Mapping(source = "cityId", target = "city.id")
    Address toEntity(PostAddressDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAddressFromDto(PostAddressDto dto, @MappingTarget Address address);
}