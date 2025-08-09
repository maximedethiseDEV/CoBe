package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.dto.PostCustomerDto;
import com.beco.api.model.entity.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class})
public interface CustomerMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    @Mapping(source = "parent.id", target = "parentId")
    CustomerDto toDto(Customer entity);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "contactId", target = "contact.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    @Mapping(source = "parentId", target = "parent.id")
    Customer toEntity(PostCustomerDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(PostCustomerDto dto, @MappingTarget Customer entity);
}