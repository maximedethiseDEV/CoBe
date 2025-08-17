package com.cobe.api.mapper;

import com.cobe.api.model.dto.ConstructionSiteDto;
import com.cobe.api.model.dto.PostConstructionSiteDto;
import com.cobe.api.model.entity.ConstructionSite;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, CustomerMapper.class, AddressMapper.class, SharedDetailsMapper.class})
public interface ConstructionSiteMapper {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.company.companyName", target = "companyName")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address.street", target = "street")
    @Mapping(source = "address.city.cityName", target = "cityName")
    @Mapping(source = "address.city.postalCode", target = "postalCode")
    @Mapping(source = "address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    ConstructionSiteDto toDto(ConstructionSite entity);

    @Mapping(source = "customerId", target = "customer", qualifiedByName = "mapCustomerIdToCustomer")
    @Mapping(source = "addressId", target = "address", qualifiedByName = "mapAddressIdToAddress")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    ConstructionSite toEntity(PostConstructionSiteDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateConstructionSiteFromDto(PostConstructionSiteDto dto, @MappingTarget ConstructionSite entity);
}