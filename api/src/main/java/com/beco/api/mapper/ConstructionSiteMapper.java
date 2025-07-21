package com.beco.api.mapper;

import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, AddressMapper.class})
public interface ConstructionSiteMapper {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    ConstructionSiteDto toDto(ConstructionSite entity);

    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "addressId", target = "address.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    ConstructionSite toEntity(ConstructionSiteDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateConstructionSiteFromDto(ConstructionSiteDto dto, @MappingTarget ConstructionSite entity);
}