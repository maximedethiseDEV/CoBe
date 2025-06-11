package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.entity.Customer;
import org.mapstruct.*;

import java.time.LocalDate;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class})
public interface CustomerMapper {

    @Mapping(target = "customerId", source = "customerId")
    @Mapping(target = "company", source = "company")
    @Mapping(target = "contact", source = "contact")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    @Mapping(target = "isSolvent", source = "isSolvent")
    @Mapping(target = "parent", source = "parent")
    @Mapping(target = "sharedDetails", ignore = true)
    CustomerDto toDto(Customer entity);

    @Mapping(target = "customerId", ignore = true)
    @Mapping(target = "company", source = "company")
    @Mapping(target = "contact", source = "contact")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    @Mapping(target = "isSolvent", source = "isSolvent")
    @Mapping(target = "parent", source = "parent")
    @Mapping(target = "sharedDetails", ignore = true)
    Customer toEntity(CustomerDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(CustomerDto dto, @MappingTarget Customer entity);
}