package com.beco.api.mapper;

import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.entity.Company;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ContactMapper.class, AddressMapper.class})
public interface CompanyMapper {
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    CompanyDto toDto(Company entity);

    @Mapping(source = "contactId", target = "contact.id")
    @Mapping(source = "addressId", target = "address.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    Company toEntity(CompanyDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCompanyFromDto(CompanyDto dto, @MappingTarget Company entity);
}