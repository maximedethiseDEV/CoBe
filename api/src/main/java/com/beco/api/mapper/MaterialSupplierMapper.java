package com.beco.api.mapper;

import com.beco.api.model.dto.MaterialSupplierDto;
import com.beco.api.model.entity.MaterialSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class, AddressMapper.class})
public interface MaterialSupplierMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    MaterialSupplierDto toDto(MaterialSupplier entity);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "contactId", target = "contact.id")
    @Mapping(source = "addressId", target = "address.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    MaterialSupplier toEntity(MaterialSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateMaterialSupplierFromDto(MaterialSupplierDto dto, @MappingTarget MaterialSupplier entity);
}