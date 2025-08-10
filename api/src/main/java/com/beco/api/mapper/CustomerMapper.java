package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.dto.PostCustomerDto;
import com.beco.api.model.entity.Customer;
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
    @Mapping(source = "parent.id", target = "parentId")
    CustomerDto toDto(Customer entity);

    @Mapping(source = "companyId", target = "company", qualifiedByName = "mapCompanyIdToCompany")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    @Mapping(source = "parentId", target = "parent", qualifiedByName = "mapCustomerIdToCustomer")
    Customer toEntity(PostCustomerDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(PostCustomerDto dto, @MappingTarget Customer entity);
}