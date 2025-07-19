package com.beco.api.mapper;

import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.entity.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ContactMapper.class, AddressMapper.class})
public interface CompanyMapper {

    CompanyDto toDto(Company entity);

    Company toEntity(CompanyDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCompanyFromDto(CompanyDto dto, @MappingTarget Company entity);
}