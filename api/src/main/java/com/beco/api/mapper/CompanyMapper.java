package com.beco.api.mapper;

import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.dto.PostCompanyDto;
import com.beco.api.model.entity.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, ContactMapper.class, AddressMapper.class, SharedDetailsMapper.class})
public interface CompanyMapper {
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address.city.cityName", target = "cityName")
    @Mapping(source = "address.city.postalCode", target = "postalCode")
    @Mapping(source = "address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    CompanyDto toDto(Company entity);

    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "addressId", target = "address", qualifiedByName = "mapAddressIdToAddress")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    Company toEntity(PostCompanyDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCompanyFromDto(PostCompanyDto dto, @MappingTarget Company company);
}