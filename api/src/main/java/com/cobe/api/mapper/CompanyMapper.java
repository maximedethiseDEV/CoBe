package com.cobe.api.mapper;

import com.cobe.api.model.dto.CompanyDto;
import com.cobe.api.model.dto.PostCompanyDto;
import com.cobe.api.model.entity.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, AddressMapper.class, SharedDetailsMapper.class})
public interface CompanyMapper {

    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address.street", target = "street")
    @Mapping(source = "address.city.cityName", target = "cityName")
    @Mapping(source = "address.city.postalCode", target = "postalCode")
    @Mapping(source = "address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    @Mapping(source = "parent.id", target = "parentId")
    CompanyDto toDto(Company entity);

    @Mapping(source = "addressId", target = "address", qualifiedByName = "mapAddressIdToAddress")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    @Mapping(source = "parentId", target = "parent", qualifiedByName = "mapCompanyIdToCompany")
    Company toEntity(PostCompanyDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCompanyFromDto(PostCompanyDto dto, @MappingTarget Company company);
}