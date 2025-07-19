package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.entity.Customer;
import org.mapstruct.*;

import java.time.LocalDate;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class})
public interface CustomerMapper {

    CustomerDto toDto(Customer entity);

    Customer toEntity(CustomerDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(CustomerDto dto, @MappingTarget Customer entity);
}