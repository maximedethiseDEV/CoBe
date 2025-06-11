package com.beco.api.mapper;

import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.entity.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ContactMapper.class, AddressMapper.class})
public interface CompanyMapper {

    @Mapping(target = "companyId", source = "companyId")
    @Mapping(target = "companyName", source = "companyName")
    @Mapping(target = "commerciallyActive", source = "commerciallyActive")
    @Mapping(target = "primaryContact", source = "primaryContact")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "sharedDetails", ignore = true)
    CompanyDto toDto(Company entity);

    @Mapping(target = "companyId", ignore = true)
    @Mapping(target = "companyName", source = "companyName")
    @Mapping(target = "commerciallyActive", source = "commerciallyActive")
    @Mapping(target = "primaryContact", source = "primaryContact")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "sharedDetails", ignore = true)
    Company toEntity(CompanyDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "companyId", ignore = true)
    void updateCompanyFromDto(CompanyDto dto, @MappingTarget Company entity);
}