package com.beco.api.mapper;

import com.beco.api.model.dto.MaterialSupplierDto;
import com.beco.api.model.entity.MaterialSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class, AddressMapper.class})
public interface MaterialSupplierMapper {

    @Mapping(target = "materialSupplierId", source = "materialSupplierId")
    @Mapping(target = "company", source = "company")
    @Mapping(target = "contact", source = "contact")
    @Mapping(target = "loadingAddress", source = "loadingAddress")
    @Mapping(target = "sharedDetails", ignore = true)
    MaterialSupplierDto toDto(MaterialSupplier entity);

    @Mapping(target = "materialSupplierId", ignore = true)
    @Mapping(target = "company", source = "company")
    @Mapping(target = "contact", source = "contact")
    @Mapping(target = "loadingAddress", source = "loadingAddress")
    @Mapping(target = "sharedDetails", ignore = true)
    MaterialSupplier toEntity(MaterialSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "materialSupplierId", ignore = true)
    void updateMaterialSupplierFromDto(MaterialSupplierDto dto, @MappingTarget MaterialSupplier entity);
}