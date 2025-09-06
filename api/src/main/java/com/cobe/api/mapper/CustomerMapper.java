package com.cobe.api.mapper;

import com.cobe.api.model.dto.CustomerDto;
import com.cobe.api.model.dto.PostCustomerDto;
import com.cobe.api.model.entity.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, CompanyMapper.class, ContactMapper.class})
public interface CustomerMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.companyName", target = "companyName")
    @Mapping(source = "company.address.city.cityName", target = "cityName")
    @Mapping(source = "company.address.city.postalCode", target = "postalCode")
    @Mapping(source = "company.address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    CustomerDto toDto(Customer entity);

    @Mapping(source = "companyId", target = "company", qualifiedByName = "mapCompanyIdToCompany")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    Customer toEntity(PostCustomerDto dto);

    @Mapping(source = "companyId", target = "company", qualifiedByName = "mapCompanyIdToCompany")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    void updateCustomerFromDto(PostCustomerDto dto, @MappingTarget Customer entity);
}